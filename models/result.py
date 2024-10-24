#!/usr/bin/python3
from models.base_model import BaseModel, db

class Result(BaseModel):
    """ Represents the result of a user taking a quiz """

    def __init__(self, *args, **kwargs):
        """ Initializes a result """
        super().__init__(*args, **kwargs)
