from flask import Blueprint, Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.json_util import dumps
from mongoengine import ValidationError, NotUniqueError, DoesNotExist
from models.transaction import Transaction

transactions_api = Blueprint("transactions_api", __name__)

# Vrati sve transakcije
@transactions_api.route("/api/transactions", methods=["GET"])
def get_transactions():
  transactions = Transaction.objects

  # Konvertovanje u listu objekata
  transactions = [transaction._data for transaction in transactions._iter_results()]

  response_data = {
    "success": True,
    "count": len(transactions),
    "data": transactions,
  }

  return Response(response=dumps(response_data, default=str), status=200, mimetype="application/json")

# Dodaj novu transakciju
@transactions_api.route("/api/transactions", methods=["POST"])
def create_transaction():
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

# Obrisi transakciju
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
