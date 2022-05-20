from .page import get_page
from components.sample import sample_component


def save_sample_page(db):
    """
    Saves sample page.

    Parameters
    ----------
    db: firebase database
    """

    data = get_page('index', [sample_component, sample_component])

    content_ref = db.collection('content')\
        .document('index')

    content_ref.set(data)
