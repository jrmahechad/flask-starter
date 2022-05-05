import flask

filter_bp = flask.Blueprint('filters', __name__)

@filter_bp.app_template_filter()
def sample_filter(sentence):
    """Sample filter

    Parameters
    ----------
    sentence : string


    Returns
    -------
    string
        Uppercase string.
    """
    return sentence.upper()
