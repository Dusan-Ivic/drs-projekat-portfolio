from flask import Blueprint, Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.json_util import dumps
from mongoengine import ValidationError, NotUniqueError, DoesNotExist
from models.transaction import Transaction,TransactionType
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
    if str(transaction["userid"]) == auth_id:
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

# Obrisi transakciju 
@transactions_api.route("/api/transactions/<id>", methods=["DELETE"])
@jwt_required()
def delete_transaction(id):
  auth_id = get_jwt_identity()
  try:
    transaction = Transaction.objects.get(id=id)
  except DoesNotExist:
    return not_found()
  
  if str(transaction["userid"]) != auth_id:
    return unauthorized()
  

  transaction.delete()

  response_data = {
    "success": True,
    "message": "Transaction deleted",
    "data": {
      "id": str(transaction._data["id"])
    }
  }

  return Response(response=dumps(response_data), status=200, mimetype="application/json")
#izracunaj portfolio
@transactions_api.route("/api/transactions/calculations", methods=["GET"])
@jwt_required()
def get_calculations():
  price_b = 0
  price_s = 0
  # Izvuci User ID iz tokena
  auth_id = get_jwt_identity()
  
  # Pronadji korisnik sa datim ID-em
  try:
      user = User.objects.get(id=auth_id)
  except DoesNotExist:
      return not_found()
  
  # Pronadji sve transakcije
  transactions1 = Transaction.objects #uzima sve transakcije
  transactions1 = [transaction._data for transaction in transactions1._iter_results()] #filtrira format prikaza
  
  # Izvuci transakcije koje pripadaju korisniku
  users_transactions1=[]
  for transaction in transactions1:
      if str(transaction["userid"]) == auth_id:
          users_transactions1.append(transaction)

  
  list_uniq_names=[]
  list_uniq=[] #lista klasa sa koinima koji imaju uniq name
  

  for uniqtransaction in users_transactions1:
    if(uniqtransaction["crypto_currency"] not in list_uniq_names):      
      if(uniqtransaction["transaction_type"] == TransactionType.BUY):
        temp = {
              "name": uniqtransaction["crypto_currency"],
              "bought": float(uniqtransaction["price"]),
              "sold": 0,
              "amount_sold": 0,
              "amount_bought": uniqtransaction["kolicina"]
        }
        price_b += float(uniqtransaction["price"])
        list_uniq.append(temp)

      elif(uniqtransaction["transaction_type"] == TransactionType.SELL):
        temp = {
              "name": uniqtransaction["crypto_currency"],
              "bought": 0,
              "sold": float(uniqtransaction["price"]),
              "amount_sold": uniqtransaction["kolicina"],
              "amount_bought": 0
        }
        price_s += float(uniqtransaction["price"])
        list_uniq.append(temp)

        
      else:
        temp = {
              "name": "skipped condittions",
        }
        list_uniq.append(temp)
      list_uniq_names.append(uniqtransaction["crypto_currency"])

     #trebace mi uslov akda sme da udje u ovaj for
    else:
      for x in list_uniq:
        if(x["name"] == uniqtransaction["crypto_currency"] and uniqtransaction["transaction_type"] == TransactionType.BUY):
          x["bought"] += float(uniqtransaction["price"])
          x["amount_bought"] += uniqtransaction["kolicina"]
          price_b += float(uniqtransaction["price"])
        elif(x["name"] == uniqtransaction["crypto_currency"] and uniqtransaction["transaction_type"] == TransactionType.SELL):
          x["sold"] += float(uniqtransaction["price"])
          x["amount_sold"] += uniqtransaction["kolicina"]
          price_s += float(uniqtransaction["price"])

      

  response_data = {
      "success": True,
      "count": len(list_uniq),
      "data": list_uniq,
      "price_b" : price_b,
      "price_s" : price_s
  }
  
  return Response(response=dumps(response_data, default=str), status=200, mimetype="application/json")

  
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