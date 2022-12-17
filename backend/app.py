from flask import Flask
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from os import getenv
from sys import exit

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

db = connect_database(getenv("MONGO_URI"), getenv("DB_NAME"))

app = Flask(__name__)

@app.route("/")
def index():
  db
  response_data = {
    "success": True,
    "message": "Welcome to Portfolio Project"
  }
  return response_data, 200

if __name__ == "__main__":
  app.run(host="0.0.0.0")