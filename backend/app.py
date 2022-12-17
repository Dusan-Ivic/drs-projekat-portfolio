from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
  response_data = {
    "success": True,
    "message": "Welcome to Portfolio Project"
  }
  return response_data, 200

if __name__ == "__main__":
  app.run(host="0.0.0.0", debug=True)