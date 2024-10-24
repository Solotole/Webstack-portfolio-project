#!/usr/bin/python3
from models.base_model import BaseModel, db

class Question(BaseModel):
        """ Represents a question in a quiz """

        def __init__(self, *args, **kwargs):
            """ Initializes a question """
            super().__init__(*args, **kwargs)
