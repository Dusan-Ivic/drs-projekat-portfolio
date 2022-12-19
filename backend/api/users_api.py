from flask import Blueprint, current_app, Response, request
from bson.json_util import dumps
from pymongo import ReturnDocument
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash

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
    user = {
      "firstName": request.json.get("firstName", None),
      "lastName": request.json.get("lastName", None),
      "address": request.json.get("address", None),
      "city": request.json.get("city", None),
      "country": request.json.get("country", None),
      "phone": request.json.get("phone", None),
      "email": request.json.get("email", None),
      "password": generate_password_hash(request.json.get("password", None)),
    }

    # TODO - Pre dodavanja proveriti da li su sva polja popunjena
    # Odraditi pomocu klase a ne dictionary-a kao gore

    current_app.db.users.insert_one(user)

    # Konvertuje svaki id u string da bi obrisano $oid
    user["_id"] = str(user["_id"])

    response_data = {
      "success": True,
      "message": "User registered",
      "data": user,
    }

    return Response(response=dumps(response_data), status=201, mimetype="application/json")

# Izmeni postojeceg korisnika
@users_api.route("/api/users/<id>", methods=["PUT"])
def update_user(id):
  with current_app.app_context():
    user_data = {
      "firstName": request.json.get("firstName", None),
      "lastName": request.json.get("lastName", None),
      "address": request.json.get("address", None),
      "city": request.json.get("city", None),
      "country": request.json.get("country", None),
      "phone": request.json.get("phone", None),
      "email": request.json.get("email", None),
      "password": generate_password_hash(request.json.get("password", None)),
    }

    # TODO - Pre izmene proveriti da li su sva polja popunjena i validna
    # Odraditi pomocu klase a ne dictionary-a kao gore

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
      "data": user,
    }
    return Response(response=dumps(response_data), status=200, mimetype="application/json")
  
# Obrisi korisnika
@users_api.route("/api/users/<id>", methods=["DELETE"])
def delete_user(id):
  with current_app.app_context():
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