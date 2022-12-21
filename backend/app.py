from flask import Flask
from flask_jwt_extended import JWTManager
from mongoengine import connect
from datetime import timedelta
from api.users_api import users_api
from api.transactions_api import transactions_api
from api.auth_api import auth_api
import secrets

connect(host="mongodb+srv://cluster0.kqej46w.mongodb.net", db="Portfolio", username="portfolio123", password="portfolio123")

app = Flask(__name__)

with app.app_context():
  app.jwt_manager = JWTManager(app)
  app.config["JWT_SECRET_KEY"] = secrets.token_hex(12);
  app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)

app.register_blueprint(users_api)
app.register_blueprint(transactions_api)
app.register_blueprint(auth_api)

if __name__ == "__main__":
  app.run(host="0.0.0.0", debug=True)
