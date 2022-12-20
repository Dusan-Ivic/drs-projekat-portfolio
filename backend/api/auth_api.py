from flask import Blueprint, current_app, request, Response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash
from bson.json_util import dumps
from bson.objectid import ObjectId
from models.user_login import UserLogin

auth_api = Blueprint("auth_api", __name__)

@auth_api.route("/login", methods=["POST"])
def login():
  with current_app.app_context():
    user_data = UserLogin(**request.get_json()).serialize() 

    user = current_app.db.users.find_one({ "email": user_data["email"] })

    if user == None:
      return not_found()

    print("User['password']: " + user["password"]);
    print("user_data['password']: " + user_data["password"]);

    # Bez check_password_hash
    if user["password"] != user_data["password"]:
      return unauthorized();

    # Checking with a hash
    # if not check_password_hash(user["password"], user_data["password"]):
    #   return unauthorized()

    # Konvertuje svaki id u string da bi obrisano $oid
    user["_id"] = str(user["_id"])

    access_token = create_access_token(identity=str(user["_id"]));

    response_data = {
      "success": True,
      "message": "User logged in",
      "data": user,
      "access_token": access_token
    }

    return Response(response=dumps(response_data), status=200, mimetype="application/json")

@auth_api.route("/profile", methods=["GET"])
@jwt_required()
def my_profile():
  token = get_jwt_identity()
  with current_app.app_context():
    user = current_app.db.users.find_one({ "_id": ObjectId(token) })

    if user == None:
      return not_found()

    # Konvertuje svaki id u string da bi obrisano $oid
    user["_id"] = str(user["_id"])

    response_data = {
      "success": True,
      "data": user,
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
