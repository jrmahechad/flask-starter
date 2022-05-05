import firebase_admin
import logging
import requests
from firebase_admin import credentials
from firebase_admin import firestore
from flask import make_response
from src.data_processing import sum

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred)
db = firestore.client()


def hook(request):
    """Main entry point of the function.
        Executes sum function.
        Returns index document if exists.

    Parameters
    ----------
    event: event
    context: context

    """
    index_ref = db.collection('content').document('index')
    index = index_ref.get()

    print(f'Executing sum function: {sum(1, 2)}')

    if index.exists:
        print(f'Document data: {index.to_dict()}')
        return index.to_dict(), 200
    else:
        return 'index not found!', 404
