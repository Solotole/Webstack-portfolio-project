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
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                collection_name = cls.__name__.lower()
                objs = db[collection_name].find()
                for obj in objs:
                    key = f"{cls.__name__}.{obj['id']}"
                    # key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = cls(**obj)
        return new_dict

    def new(self, obj):
        """ add the object to the current database session """
        new_document = db[obj.__class__.__name__.lower()].insert_one(obj.to_dict())

    # def save(self):
    # """ commit all changes of the current database session """
    # db[str(self.__class__.__name__)].insert_one(self.to_dict())

    def delete(self, obj=None):
        """ delete from the current database session obj """
        if obj:
            db[obj.__class__.__name__.lower()].delete_one({"id": obj.id})

    def get(self, cls, id):
        """  method to retrieve one object """
        if not cls or not id:
            return None
        all_dicts = {}
        collection_name = cls.__name__.lower()
        obj_dict = db[collection_name].find_one({"id": id})
        if obj_dict:
            return cls(**obj_dict)
        return None
