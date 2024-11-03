#!/usr/bin/python3
from models.base_model import BaseModel, db

class Result(BaseModel):
    """ Represents the result of a user taking a quiz """

    def __init__(self,user_id, quiz_id, score, *args, **kwargs):
        """ Initializes a result """
        super().__init__(*args, **kwargs)
        self.user_id = user_id
        self.quiz_id = quiz_id
        self.score = score
