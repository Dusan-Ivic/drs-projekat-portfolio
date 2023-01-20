from flask import Blueprint, Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.json_util import dumps
from mongoengine import ValidationError, NotUniqueError, DoesNotExist
from models.user import User

users_api = Blueprint ("users_api", __name__)

# Vrati sve korisnike
@users_api.route("/api/users", methods=["GET"])
def get_users():
  users = User.objects

  # Konvertovanje u listu objekata
  users = [user._data for user in users._iter_results()]

  response_data = {
    "success": True,
    "count": len(users),
    "data": users,
  }

  return Response(response=dumps(response_data), status=200, mimetype="application/json")
# proveri uniq za name 
# Dodaj novog korisnika
@users_api.route("/api/users", methods=["POST"])
def register_user():
  user = User(**request.get_json())
  
  try:
    user.save()
  except (ValidationError, NotUniqueError) as err:
    response_data = {
      "success": False,
      "message": "Validation failed",
      "errors": err.to_dict(),
    }
    return Response(response=dumps(response_data), status=400, mimetype="application/json")

  response_data = {
    "success": True,
    "message": "User registered",
    "data": user._data,
  }

  return Response(response=dumps(response_data), status=201, mimetype="application/json")

# Izmeni postojeceg korisnika
@users_api.route("/api/users/<id>", methods=["PUT"])
@jwt_required()
def update_user(id):
  auth_id = get_jwt_identity()
  if auth_id != id:
    return unauthorized() 

  try:
    user = User.objects.get(id=id)
  except DoesNotExist:
    return not_found()

  try:
    User(**request.get_json()).validate()
  except ValidationError as err:
    response_data = {
      "success": False,
      "message": "Validation failed",
      "errors": err.to_dict(),
    }
    return Response(response=dumps(response_data), status=400, mimetype="application/json")

  user.update(**request.get_json())
  user.reload()

  response_data = {
    "success": True,
    "message": "User edited",
    "data": user._data
  }

  return Response(response=dumps(response_data), status=200, mimetype="application/json")
  
# Obrisi korisnika
@users_api.route("/api/users/<id>", methods=["DELETE"])
@jwt_required()
def delete_user(id):
  auth_id = get_jwt_identity()
  if auth_id != id:
    return unauthorized()

  try:
    user = User.objects.get(id=id)
  except DoesNotExist:
    return not_found()

  user.delete()

  response_data = {
    "success": True,
    "message": "User deleted",
    "data": {
      "id": str(user._data["id"])
    }
  }

  return Response(response=dumps(response_data), status=200, mimetype="application/json")
  
@users_api.errorhandler(404)
def not_found(error=None):
  response_data = {
    "success": False,
    "message": "User Not Found",
    "endpoint": request.endpoint
  }
  return Response(response=dumps(response_data), status=404, mimetype="application/json")

@users_api.errorhandler(401)
def unauthorized(error=None):
  response_data = {
    "success": False,
    "message": "Wrong or missing credentials",
    "endpoint": request.endpoint
  }
  return Response(response=dumps(response_data), status=401, mimetype="application/json")
