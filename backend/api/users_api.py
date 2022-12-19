from flask import Blueprint, jsonify, request
# from bson.json_util import dumps
# from flask_pymongo import PyMongo
# from bson.objectid import ObjectId
# from werkzeug.security import generate_password_hash, check_password_hash

users_api = Blueprint("users_api", __name__)

#vrati sve usere (ne znam koliko je ovo safe ili potrebno lmao)
@users_api.route("/api/users", methods=["GET"])
def get_users():
  # users = db.fortesting.find()
  # resp = dumps(users)
  # return resp
  return "Get all users"

#dodavanje novog korisnika
@users_api.route("/api/users", methods=["POST"])
def register_user():
  # _json = request.json
  # _name = _json['name']
  # _sname = _json['sname']
  # _addr = _json['addr']
  # _city = _json['city']
  # _country = _json['country']
  # _phone = _json['phone']
  # _email = _json['email']
  # _pwd = _json['pwd']

  # if _name and _email and _pwd and _sname and _addr and _city and _country and _phone and  request.method == 'POST':
  #   _hashed_pwd = generate_password_hash(_pwd)
  #   id = db.fortesting.insert_one({'name':_name,'email':_email,'pwd':_hashed_pwd,'sname':_sname,'addr':_addr,'city':_city,'country':_country,'phone':_phone})
  #   resp = jsonify("User Added")
  #   resp.status_code = 200
  #   return resp
  # else:
  #   return not_found()
  return "Register new user"

#izmeni postojeceg korisnika
@users_api.route("/api/users/<id>", methods=["PUT"])
def update_user(id):
  # _id = id
  # _json = request.json
  # _name = _json['name']
  # _sname = _json['sname']
  # _addr = _json['addr']
  # _city = _json['city']
  # _country = _json['country']
  # _phone = _json['phone']
  # _email = _json['email']
  # _pwd = _json['pwd']
  
  # user = db.fortesting.find_one({'_id':ObjectId(id)})
  # if user == None:
  #   return not_found()

  # if _name and _email and _pwd and _sname and _addr and _city and _country and _phone and  request.method == 'PUT':
  #   _hashed_pwd = generate_password_hash(_pwd)
  #   db.fortesting.update_one({'_id': ObjectId(_id['$oid']) if '$oid' in _id else ObjectId(_id)}, {'$set': {'name':_name,'email':_email,'pwd':_hashed_pwd,'sname':_sname,'addr':_addr,'city':_city,'country':_country,'phone':_phone}})
  #   resp = jsonify("User updated")
  #   resp.status_code = 200
  #   return resp
  # else:
  #   return not_found()
  return f"Update existing user ({id})"

#obrisi korisnika po id 
@users_api.route("/api/users/<id>", methods=["DELETE"])
def delete_user(id):
  # db.fortesting.delete_one({'_id':ObjectId(id)})
  # resp = jsonify("User deleted")  
  # resp.status_code = 200
  # return resp
  return f"Delete existing user ({id})"
  
@users_api.errorhandler(404)
def not_found(error = None):
  # message = {
  #   'status': 404,
  #   'message' : 'Not Found' + request.url
  # }
  # resp = jsonify(message)
  # resp.status_code = 404
  # return resp
  return "Not found"