from mongoengine import Document, EmailField, StringField

class User(Document):
  firstName = StringField(required=True, min_length=1)
  lastName = StringField(required=True, min_length=1)
  address = StringField(required=True, min_length=1)
  city = StringField(required=True, min_length=1)
  country = StringField(required=True, min_length=1)
  phone = StringField(required=True, min_length=1)
  email = EmailField(required=True, min_length=4, unique=True)
  password = StringField(required=True, min_length=6)
  
  meta = { "collection": "users" }
