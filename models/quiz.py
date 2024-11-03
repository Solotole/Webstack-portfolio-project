#!/usr/bin/python3
"""Quiz model representation"""

from models.base_model import BaseModel, db

class Quiz(BaseModel):
        """ Represents a Quiz object in the system """

        def __init__(self, *args, **kwargs):
            """ Initializes a quiz """
            super().__init__(*args, **kwargs)
