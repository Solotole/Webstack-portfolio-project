#!/usr/bin/python3
from models.base_model import BaseModel, db

class Quiz(BaseModel):
        """ Represents a Quiz object in the system """
        def __init__(self,title, description, *args, **kwargs):
            """ Initializes a quiz """
            super().__init__(*args, **kwargs)
            self.title = title
            self.description = description
            self.questions = []
