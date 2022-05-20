import hashlib
import hmac
import logging
import os
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

USER = os.environ.get('USER')
TOKEN = os.environ.get('TOKEN')
REPO = os.environ.get('REPO')
YOUR_SECRET = os.environ.get('YOUR_SECRET')
PROJECT_ID = os.environ.get('GCP_PROJECT')
BRANCH = os.environ.get('BRANCH')
ENV = os.environ.get('ENV')

REPO = f'https://{USER}:{TOKEN}@github.hugeinc.com/{REPO}.git'
SECRET = f'{YOUR_SECRET}'
BRANCHES = {
    f"{BRANCH}": f'gcloud builds submit --async --config cloud-build/cloudbuild.{ENV}.yaml --project={PROJECT_ID}',
}

CLONES = {
    f"{BRANCH}": ['clone', '--branch', f'{BRANCH}', REPO, '.'],
}

credentials = GoogleCredentials.get_application_default()
service = discovery.build(
    'cloudbuild', 'v1', credentials=credentials, cache_discovery=False)


def get_build(branch):
    return {
        'steps': [
            {
                'name': 'gcr.io/cloud-builders/git',
                'id': 'CLONE_REPO',
                'args': CLONES[branch],
            },
            {
                'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
                'id': 'START_BUILD',
                'waitFor': ['CLONE_REPO'],
                'entrypoint': 'bash',
                'args': ['-c', BRANCHES[branch]],
            },
        ],
        'timeout': '1200s',
    }


def get_signature(payload):
    key = bytes(SECRET, 'utf-8')
    digest = hmac.new(key=key, msg=payload, digestmod=hashlib.sha1)
    signature = digest.hexdigest()
    return signature


def github_event(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    try:
        secret = request.headers.get('X-Hub-Signature').split('=')[1]
        expected = get_signature(request.get_data())
        if secret != expected:
            logging.warning('failed secret check')
            logging.warning(f'given: {secret}')
            logging.warning(f'expected: {expected}')
            return 'failed secret'

        payload = request.get_json()
        if payload and 'pull_request' in payload:
            logging.info('has pull request')
            ref = payload['pull_request']['base']['ref']
            logging.info(f'ref: {ref}')
            if ref == BRANCH and payload['action'] == 'closed':
                logging.info(f'starting deploy for branch: {ref}')
                build = get_build(ref)
                service.projects().builds().create(projectId=PROJECT_ID, body=build).execute()
            else:
                logging.info(
                    f'not deploying - ref: {ref} | action: {payload["action"]}')
    except Exception as ex:
        logging.error(ex)
        return 'error'
    return 'ok'
