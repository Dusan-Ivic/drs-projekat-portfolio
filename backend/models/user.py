from mongoengine import Document, EmailField, StringField, IntField

class User(Document):
  firstName = StringField(required=True, unique=False)
  lastName = StringField(required=True, unique=False)
  address = StringField(required=True, unique=False)
  city = StringField(required=True, unique=False)
  country = StringField(required=True, unique=False)
  phone = IntField(required=True, unique=True, min_value = 0)
  email = EmailField(required=True, unique=True)
  password = StringField(required=True, min_length=6)
  
  meta = { "collection": "users" }
