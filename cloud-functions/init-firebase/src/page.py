from collections import namedtuple
from datetime import datetime

Page = namedtuple('Page', field_names=[
    'name',
    'components',
])

Component = namedtuple('Component', field_names=[
    'name',
    'type',
    'data'
])

def get_component(name, type, data):
    """
    Build component schema and initialize.

    Parameters
    ----------
    name: string
    type: string
    data: dict

    Returns
    -------
    dict
        component as a dict.
    """
    return Component(name=name, type=type, data=data)._asdict()

def get_page(name, components):
    """
    Build component schema and initialize.

    Parameters
    ----------
    name: string
    components: list<dict>

    Returns
    -------
    dict
        component as a dict.
    """
    return Page(name=name, components=components)._asdict()
