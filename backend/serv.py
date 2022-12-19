import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
import secrets;
import test_routes;


api = Flask(__name__)

api.config["JWT_SECRET_KEY"] = secrets.token_hex(12);
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)

@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
      return response

@api.route('/login', methods=["POST"])
def create_token():
    email = request.json.get("email", None);
    password = request.json.get("password", None);

    #To-do: check the db and see if email and pw are valid
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401;

    access_token = create_access_token(identity=email); #create_access_token will create a token and store it
    response = {"access_token":access_token};
    return response;

#Expected json request for /login
# {
#     "email": "test",
#     "password": "test"
# } 


@api.route('/profile')
@jwt_required()
def my_profile():
    response_body = {
        "Json1": "Welcome to the frontend page",
        "about" :"This is some next about this front end page that will be sent to react"
    }

    return response_body

@api.route("/logout", methods=["DELETE"])
def logout():
    jti = get_jwt()["jti"]
    #jwt_redis_blocklist.set(jti, "", ex=ACCESS_EXPIRES)
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response);
    
    return response;


if __name__ == "__main__":
  api.run(debug=True);

