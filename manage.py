# manage.py

from app.routes import api
from app import db
from flask import Flask
import os
# from flask_cors import CORS #comment this on deployment

app = Flask(__name__, static_folder='static/build',
            static_url_path='/', template_folder='static/build')

# CORS(app) #comment this on deployment

# set config
app.config.from_object('app.config.TestingConfig')

db.init_app(app)

# register api
api.init_app(app)

# create tabels
with app.app_context():
    db.create_all()

DEBUG = bool(os.environ.get("DEBUG", False))

if __name__ == '__main__':
    app.run(debug=DEBUG)
