import logging

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)


def sum(number1, number2):
    """Return a formatted string

    Parameters
    ----------
    number1: number
    number2: number

    Returns
    -------
    number
        Sum of two numbers.
    """

    return number1 + number2
