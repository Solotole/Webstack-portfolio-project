#!/usr/bin/python3
""" User class that addresses user model """
from models.base_model import BaseModel, db

class User(BaseModel):
    """user classs """
    def __init__(self, *args, **kwargs):
        """class initialization method"""
        super().__init__(*args, **kwargs)
