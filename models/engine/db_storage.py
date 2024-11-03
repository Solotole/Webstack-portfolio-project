#!/usr/bin/python3
""" Database storage mechanism """
from models.base_model import BaseModel, db
from models.quiz import Quiz
from models.question import Question
from models.answer import Answer
from models.result import Result
from models.user import User
from models.chatmessages import ChatMessage


classes = {'User': User, 'Result': Result, 'ChatMessage': ChatMessage, 'Quiz': Quiz, 'Question': Question, 'Answer': Answer}


class DBStorage:
    """ DBStorage class mechanism """
    __engine = None
    __storage = None

    def __init__(self):
        """ Class initialization magic method """
        pass

    def all(self, cls=None):
        """ querrying through a database """
        new_dict = {}
        if cls:
            collection_name = cls.__name__.lower()
            objs = db[collection_name].find()
            for obj in objs:
                key = f"{cls.__name__}.{obj['id']}"
                new_dict[key] = cls(**obj)
        return new_dict

    def new(self, obj):
        """ add the object to the current database session """
        db[obj.__class__.__name__.lower()].insert_one(obj.to_dict())

    def delete(self, cls, obj_id):
        """ delete from the current database session obj """
        if isinstance(cls, str):
            cls = classes[cls]
        if cls and obj_id:
            db[cls.__name__.lower()].delete_one({"id": obj_id})

    def get(self, cls, id):
        """  method to retrieve one object """
        if not cls or not id:
            return None
        query = {}
        all_dicts = {}
        if isinstance(cls, str):
            cls = classes[cls]
        collection_name = cls.__name__.lower()
        if collection_name == "answer":
            query['doc_id'] = id
        elif collection_name == "question":
            query['id'] = id
        obj_dict = db[collection_name].find_one(query)
        if obj_dict:
            return cls(**obj_dict)
        return None

    def update(self, cls, doc_id, data):
        """ method to carry out update of data/document in collection"""
        if not cls or not doc_id or not data:
            return None
        query = {}
        # if not self.get(cls, doc_id):
        # return None
        if isinstance(cls, str):
            cls = classes[cls]
        collection_name = cls.__name__.lower()
        if cls.__name__ == "Question":
            db[collection_name].update_one({"id": doc_id}, {"$set": {"question": data.get("question")}})
        elif cls.__name__ == "Answer":
            db[collection_name].update_one({"question_id": doc_id}, {"$set": {
                "answers": data.get("answers"),
                "correct_answer": data.get("correct_answer")
            }})
        return True

    def get_existing(self, cls, dictionary):
        """trying to find out if user exists
        by querying for cls credentials
        """
        if not cls or not dictionary:
            return None
        obj_dict = {}
        if isinstance(cls, str):
            cls = classes[cls]
        collection_name = cls.__name__.lower()
        obj_dict = db[collection_name].find_one(dictionary)
        if obj_dict:
            return obj_dict 
        return

    def delete_existing(self, cls, obj):
        """delete answers to a question based on question_id"""
        if not cls or not obj:
            return None
        obj_dict = {}
        if isinstance(cls, str):
            cls = classes[cls]
        # confirming if questions exist and returning document
        obj_dict = self.get_existing(cls, obj)
        if not obj_dict:
            return
        # deletion of answer document with obj_id.id
        if obj_dict:
            self.delete(cls, obj_dict['id'])
        return
