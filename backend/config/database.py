from pymongo import MongoClient
from pymongo.errors import PyMongoError
from sys import exit

def connect_database(connection_string, database_name):
  try:
    client = MongoClient(connection_string, serverSelectionTimeoutMS=2000)
    client.server_info()
    database = client.get_database(database_name)
    print("MongoDB Connected")
    return database
  except PyMongoError as mongo_err:
    print("MongoDB Connection Failed")
    exit(mongo_err)