from .page import get_component, get_page

def save_sample_page(db):
    """
    Saves sample page.

    Parameters
    ----------
    db: firebase database
    """
    sample_component = get_component('sample', 'default', data=dict(copy='sample text'))

    data = get_page('index', [sample_component])

    content_ref = db.collection('content')\
        .document('index')

    content_ref.set(data)
