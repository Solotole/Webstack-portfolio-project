#!/usr/bn/python3
""" app module """
from os import getenv
from flask import Flask, Blueprint, jsonify, make_response
from flask_cors import CORS
from models import storage
from api.v1.views import app_views
from models.user import User

app = Flask(__name__)
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


@app.errorhandler(404)
def err(error):
    """handle 404 error"""
    return make_response({"error": "Not found"}, 404)


@app.errorhandler(401)
def unauthorized(error):
    """hanling 401 error"""
    return make_response({"error": "Unauthorized personnel"}, 401)


if __name__ == "__main__":
    host ='localhost'
    port = 5001
    app.run(host=host, port=port, threaded=True)
