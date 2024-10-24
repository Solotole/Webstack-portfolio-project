#!/usr/bin/python3
from models.base_model import BaseModel, db

class Answer(BaseModel):
    """ Represents a possible answer for a question """

    def __init__(self, *args, **kwargs):
        """ Initializes an answer """
        super().__init__(*args, **kwargs)
