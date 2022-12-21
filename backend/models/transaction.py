from mongoengine import Document, StringField, IntField, DateField
import datetime

class Transaction(Document):
  transType = StringField(required=True, min_length=1)
  crypto = StringField(required=True, min_length=1)
  transDate = DateField(required=True, min_length=1)
  price = IntField(required=True, min_length=1)
  
  meta = { "collection": "transactions" }
