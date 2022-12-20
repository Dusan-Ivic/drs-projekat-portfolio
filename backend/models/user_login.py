from mongoengine import Document, EmailField, StringField


class UserLogin(Document):
    email = EmailField(required=True, unique=True)
    password = StringField(required=True, min_length=6)
   
    def serialize(self):
        return {
        "email": self.email,
        "password":self.password     
    }