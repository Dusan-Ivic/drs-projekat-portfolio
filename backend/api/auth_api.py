from flask import Blueprint, request, Response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from bson.json_util import dumps
from mongoengine import DoesNotExist
from models.user import User

auth_api = Blueprint("auth_api", __name__)

# Uloguj korisnika
@auth_api.route("/login", methods=["POST"])
def login():
  email = request.get_json()["email"]
  password = request.get_json()["password"]

  try:
    user = User.objects.get(email=email)
  except DoesNotExist:
    return not_found()

  if user._data["password"] != password:
    return unauthorized()

  access_token = create_access_token(identity=str(user._data["id"]));

  response_data = {
    "success": True,
    "message": "User logged in",
    "data": user._data,
    "access_token": access_token
  }

  return Response(response=dumps(response_data), status=200, mimetype="application/json")
  
@auth_api.errorhandler(401)
def unauthorized(error=None):
  response_data = {
    "success": False,
    "message": "Wrong or missing credentials",
    "endpoint": request.endpoint
  }
  return Response(response=dumps(response_data), status=401, mimetype="application/json")

@auth_api.errorhandler(404)
def not_found(error=None):
  response_data = {
    "success": False,
    "message": "User Not Found",
    "endpoint": request.endpoint
  }
  return Response(response=dumps(response_data), status=404, mimetype="application/json")
