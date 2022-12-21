from mongoengine import Document, StringField, DecimalField, DateTimeField, EnumField
from enum import Enum
from datetime import datetime

class TransactionType(Enum):
  BUY = "buy"
  SELL = "sell"

class Transaction(Document):
  transaction_type = EnumField(TransactionType, required=True)
  crypto_currency = StringField(required=True, min_length=1)
  timestamp = DateTimeField(default=datetime.utcnow)
  price = DecimalField(required=True, min_value=0)
  
  meta = { "collection": "transactions" }
