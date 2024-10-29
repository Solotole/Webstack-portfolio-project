#!/usr/bin/python3
""" Database storage mechanism """
from models.base_model import BaseModel, db
from models.quiz import Quiz
from models.question import Question
from models.answer import Answer
from models.result import Result
from models.user import User


classes = {'User': User, 'Result': Result, 'Quiz': Quiz, 'Question': Question, 'Answer': Answer}


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
                # key = obj.__class__.__name__ + '.' + obj.id
                new_dict[key] = cls(**obj)
        return new_dict

    def new(self, obj):
        """ add the object to the current database session """
        db[obj.__class__.__name__.lower()].insert_one(obj.to_dict())

    def delete(self, cls, obj_id):
        """ delete from the current database session obj """
        if cls and obj_id:
            db[classes[cls].__name__.lower()].delete_one({"id": obj_id})

    def get(self, cls, id):
        """  method to retrieve one object """
        if not cls or not id:
            return None
        all_dicts = {}
        if isinstance(cls, str):
            cls = classes[cls]
        collection_name = cls.__name__.lower()
        obj_dict = db[collection_name].find_one({"id": id})
        if obj_dict:
            return cls(**obj_dict)
        return None

    def update(self, cls, doc_id, data):
        """ method to carry out update of data/document in collection"""
        if not cls or not doc_id or not data:
            return None
        if not self.get(cls, doc_id):
            return None
        if isinstance(cls, str):
            cls = classes[cls]
        collection_name = cls.__name__.lower()
        db[collection_name].update_one({"id": doc_id}, {"$set": data})

    def get_existing(self, cls, dictionary):
        """trying to find out if user exists
        by querying for user credentials
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
        return False
