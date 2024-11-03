#!/usr/bin/python3
""" views iporting blueprint
"""
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix="/api/v1")

from api.v1.views.answer_routes import *
from api.v1.views.question_routes import *
from api.v1.views.quiz_routes import *
from api.v1.views.messages import *
