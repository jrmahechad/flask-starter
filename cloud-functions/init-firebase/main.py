import logging

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from src.sample_page import save_sample_page

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred)
db = firestore.client()


def hook(request):
    """Main entry point of the function.
        Initialize information in firebase

    Parameters
    ----------
    request : request

    """
    save_sample_page(db)

    return '', 200

if __name__ == "__main__":
    save_index(db)
