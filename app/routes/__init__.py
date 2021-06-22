# app/routes/__init__.py

from flask_restful import Api, Resource
from flask import render_template, make_response
from app.routes.todos import addTodo, editTodo
from app import db
from app.models import TodoList
import csv

api = Api()


class Index(Resource):
    def get(self, path):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('index.html'), 200, headers)


class Reset_db(Resource):
    def get(self):
        db.drop_all()
        db.create_all()
        db.session.commit()
        print("database reset done!")
        return "Database reset done!"


class Load_data(Resource):
    def get(self):
        # load sample data in TodoList table via Query
        db.session.add(TodoList(name='A'))
        db.session.add(TodoList(name='B'))
        db.session.add(TodoList(name='C'))
        db.session.add(TodoList(name='D'))

        # load sample data in TodoList table via CSV file
        with open('app/sample-data/TodoList.csv', 'r', encoding="utf-8") as todoList_csv:
            todoList_csv_reader = csv.reader(todoList_csv, delimiter=',')
            for author in todoList_csv_reader:
                db.session.add(TodoList(name=author[0]))

        db.session.commit()
        print("TodoList table loaded")
        return "TodoList table loaded"


# Default URL Path for React App
api.add_resource(Index, '/', defaults={'path': ''})

# Other Paths
api.add_resource(addTodo, '/api/addTodo')
api.add_resource(editTodo, '/api/editTodo/<int:id>')

# Database Reset/ReCreate
api.add_resource(Reset_db, '/api/reset_db')

# Loads Sample Data into Database via CSV file/Query
api.add_resource(Load_data, '/api/load_data')
