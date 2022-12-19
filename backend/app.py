from flask import Flask
from config.database import connect_database
from api.users_api import users_api
from api.auth_api import auth_api

db = connect_database("mongodb+srv://portfolio123:portfolio123@cluster0.kqej46w.mongodb.net/?retryWrites=true&w=majority", "Portfolio")

app = Flask(__name__)

with app.app_context():
  app.db = db

app.register_blueprint(users_api)
app.register_blueprint(auth_api)

if __name__ == "__main__":
  app.run(host="0.0.0.0", debug=True)
