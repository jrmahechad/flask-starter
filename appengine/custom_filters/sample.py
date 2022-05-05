import flask

blueprint = flask.Blueprint('filters', __name__)

@blueprint.app_template_filter()
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
