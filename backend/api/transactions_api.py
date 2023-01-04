from flask import Blueprint, Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.json_util import dumps
from mongoengine import ValidationError, NotUniqueError, DoesNotExist
from models.transaction import Transaction
from models.user import User
import json

transactions_api = Blueprint("transactions_api", __name__)

# Vrati sve transakcije 
@transactions_api.route("/api/transactions", methods=["GET"])
@jwt_required()
def get_transactions():
  auth_id = get_jwt_identity()

  try:
    user = User.objects.get(id=auth_id)
  except DoesNotExist:
    return not_found()
  
  transactions = Transaction.objects
 
  transactions = [transaction._data for transaction in transactions._iter_results()]

  users_transactions=[]
  for transaction in transactions:
    if str(transaction.userid) == auth_id:
      users_transactions.append(transaction)

  response_data = {
    "success": True,
    "count": len(users_transactions),
    "data": users_transactions,
  }

  return Response(response=dumps(response_data, default=str), status=200, mimetype="application/json")



# Dodaj novu transakciju // buy
@transactions_api.route("/api/transactions", methods=["POST"])
@jwt_required()
def create_transaction():
  auth_id = get_jwt_identity()

  try:
    user = User.objects.get(id=auth_id)
  except DoesNotExist:
    return not_found()

  transaction = Transaction(**request.get_json())

  try:
    transaction.save()
  except (ValidationError, NotUniqueError) as err:
    response_data = {
      "success": False,
      "message": "Validation failed",
      "errors": err.to_dict(),
    }
    return Response(response=dumps(response_data), status=400, mimetype="application/json")

  response_data = {
    "success": True,
    "message": "Transaction created",
    "data": transaction._data,
  }

  return Response(response=dumps(response_data, default=str), status=201, mimetype="application/json")

# Obrisi transakciju // sell
# nakon sto vratis sve sta lik ima/ ako ima izbrises iz liste, ako nema kazes bro u poor
@transactions_api.route("/api/transactions/<id>", methods=["DELETE"])
def delete_transaction(id):
  try:
    transaction = Transaction.objects.get(id=id)
  except DoesNotExist:
    return not_found()

  transaction.delete()

  response_data = {
    "success": True,
    "message": "Transaction deleted",
    "data": {
      "id": str(transaction._data["id"])
    }
  }

  return Response(response=dumps(response_data), status=200, mimetype="application/json")
  
@transactions_api.errorhandler(404)
def not_found(error=None):
  response_data = {
    "success": False,
    "message": "Transaction Not Found",
    "endpoint": request.endpoint
  }
  return Response(response=dumps(response_data), status=404, mimetype="application/json")

@transactions_api.errorhandler(401)
def unauthorized(error=None):
  response_data = {
    "success": False,
    "message": "Wrong or missing credentials",
    "endpoint": request.endpoint
  }
  return Response(response=dumps(response_data), status=401, mimetype="application/json")


#to do: prikazi svega, formule za racunanje, render nakon svakog buy/sell, odradi lep css za sve 