#!/usr/bin/pyhton3
"""model dealing with chat messages of users"""
from models.base_model import BaseModel, db


class ChatMessage(BaseModel):
    """subclass to BaseModel about chat messages
    between users
    """

    def __init__(self, *args, **kwargs):
        """ChatMessage class initialzation method"""
        super().__init__(*args, **kwargs)
