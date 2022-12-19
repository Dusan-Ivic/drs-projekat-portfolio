from flask import Flask
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from os import getenv
from sys import exit
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

def connect_database(connection_string, database_name):
  try:
    client = MongoClient(connection_string, serverSelectionTimeoutMS=1000)
    client.server_info()
    database = client.get_database(database_name)
    print("MongoDB Connected")
    return database
  except PyMongoError as mongo_err:
    print("MongoDB Connection Failed")
    exit(mongo_err)


db = connect_database ("mongodb+srv://portfolio123:portfolio123@cluster0.kqej46w.mongodb.net/?retryWrites=true&w=majority","Portfolio")

app = Flask(__name__)

#dodavanje novog korisnika
@app.route('/api/signup',methods = ['POST'])
def signup():
  _json = request.json
  _name = _json['name']
  _sname = _json['sname']
  _addr = _json['addr']
  _city = _json['city']
  _country = _json['country']
  _phone = _json['phone']
  _email = _json['email']
  _pwd = _json['pwd']

  if _name and _email and _pwd and _sname and _addr and _city and _country and _phone and  request.method == 'POST':
    _hashed_pwd = generate_password_hash(_pwd)
    id = db.fortesting.insert_one({'name':_name,'email':_email,'pwd':_hashed_pwd,'sname':_sname,'addr':_addr,'city':_city,'country':_country,'phone':_phone})
    resp = jsonify("User Added")
    resp.status_code = 200
    return resp

  else:
    return not_found()

#vrati sve usere (ne znam koliko je ovo safe ili potrebno lmao)
@app.route('/api/fetch',methods = ['GET'])
def fetch():
  users = db.fortesting.find()
  resp = dumps(users)
  return resp

#obrisi korisnika po id 
@app.route('/api/delete/<id>',methods=['DELETE'])
def purge_user(id):
  db.fortesting.delete_one({'_id':ObjectId(id)})
  resp = jsonify("User deleted")  
  resp.status_code = 200
  return resp

#vrati usera po id 
#@app.route('/api/fetch_one/<id>',methods = ['GET'])
#def fetch_one(id):
#  user = db.fortesting.find_one({'_id':ObjectId(id)})
#  resp = dumps(user)
#  return resp

#izmeni postojeceg korisnika
@app.route('/api/update/<id>', methods=['PUT'])
def update(id):
  _id = id
  _json = request.json
  _name = _json['name']
  _sname = _json['sname']
  _addr = _json['addr']
  _city = _json['city']
  _country = _json['country']
  _phone = _json['phone']
  _email = _json['email']
  _pwd = _json['pwd']
  
  user = db.fortesting.find_one({'_id':ObjectId(id)})
  if user == None:
    return not_found()

  if _name and _email and _pwd and _sname and _addr and _city and _country and _phone and  request.method == 'PUT':
    _hashed_pwd = generate_password_hash(_pwd)
    db.fortesting.update_one({'_id': ObjectId(_id['$oid']) if '$oid' in _id else ObjectId(_id)}, {'$set': {'name':_name,'email':_email,'pwd':_hashed_pwd,'sname':_sname,'addr':_addr,'city':_city,'country':_country,'phone':_phone}})
    resp = jsonify("User updated")
    resp.status_code = 200
    return resp
  else:
    return not_found()
    
#temp
@app.route('/')
def default():
  return "Up and runin"

@app.errorhandler(404)
def not_found(error = None):
  message = {
    'status': 404,
    'message' : 'Not Found' + request.url
  }
  resp = jsonify(message)
  resp.status_code = 404
  return resp

if __name__ == "__main__":
  app.run(debug=True,host="0.0.0.0")

