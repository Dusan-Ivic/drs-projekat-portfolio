from flask import Blueprint, current_app, Response, request
from bson.json_util import dumps
from pymongo import ReturnDocument
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash
from models.user import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

users_api = Blueprint("users_api", __name__)

# Vrati sve korisnike
@users_api.route("/api/users", methods=["GET"])
def get_users():
  with current_app.app_context():
    users = list(current_app.db.users.find())

    # Konvertuje svaki id u string da bi obrisano $oid
    for user in users:
      user["_id"] = str(user["_id"])

    response_data = {
      "success": True,
      "count": len(users),
      "data": users,
    }

    return Response(response=dumps(response_data), status=200, mimetype="application/json")

# Dodaj novog korisnika
@users_api.route("/api/users", methods=["POST"])
def register_user():
  with current_app.app_context():

    user = User(**request.get_json()).serialize() 

    #bez generate_password_hash-a
    user["password"] = user["password"];
    # user["password"] = generate_password_hash(user["password"])

    current_app.db.users.insert_one(user)

    # Konvertuje svaki id u string da bi obrisao $oid
    user["_id"] = str(user["_id"])

    response_data = {
      "success": True,
      "message": "User registered",
      "data": user,
    }

    return Response(response=dumps(response_data), status=201, mimetype="application/json")

# Izmeni postojeceg korisnika
@users_api.route("/api/users/<id>", methods=["PUT"])
@jwt_required()
def update_user(id):
  auth_id = get_jwt_identity()
  with current_app.app_context():
    if auth_id != id:
      return unauthorized() 

    user_data = User(**request.get_json()).serialize()
  
    user = current_app.db.users.find_one_and_update(
      { "_id": ObjectId(id) },
      { "$set": {
        "firstName": user_data["firstName"],
        "lastName": user_data["lastName"],
        "address": user_data["address"],
        "city": user_data["city"],
        "country": user_data["country"],
        "phone": user_data["phone"],
        "email": user_data["email"],
        "password": user_data["password"],
      }},
      return_document=ReturnDocument.AFTER
    )

    if user == None:
      return not_found()

    # Konvertuje svaki id u string da bi obrisano $oid
    user["_id"] = str(user["_id"])

    response_data = {
      "success": True,
      "message": "User edited",
      "data": user
     }
    return Response(response=dumps(response_data), status=200, mimetype="application/json")
  
# Obrisi korisnika
@users_api.route("/api/users/<id>", methods=["DELETE"])
@jwt_required()
def delete_user(id):
  auth_id = get_jwt_identity()
  with current_app.app_context():
    if auth_id != id:
      return unauthorized() 

    user = current_app.db.users.find_one_and_delete({ "_id": ObjectId(id) })

    if user == None:
      return not_found()

    response_data = {
      "success": True,
      "message": "User deleted",
      "data": {
        "_id": str(id)
      },
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
