# app/routers/todos.py

from flask_restful import Resource, reqparse
from app.models import TodoList
from flask import Response
import json
from app import db


class addTodo(Resource):
    def get(self):
        todoList = TodoList.query.all()
        results = [
            {
                "id": todo.id,
                "name": todo.name
            } for todo in todoList]
        return Response(json.dumps(results),  mimetype='application/json')

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('task_name', type=str)

        args = parser.parse_args()
        new_todo = TodoList(name=args['task_name'])
        db.session.add(new_todo)
        db.session.commit()
        return {"message": f"Todo {new_todo.name} has been created successfully."}


class editTodo(Resource):
    def put(self, id):
        todo = TodoList.query.get_or_404(id)
        if todo:
            parser = reqparse.RequestParser()
            parser.add_argument('task_name', type=str)

            args = parser.parse_args()

            todo.name = args['task_name']
            db.session.add(todo)
            db.session.commit()
            return {"status": "Sucess", "message": "car update sucessfully..."}
        else:
            return {"status": "Error", "message": "car Not Found..."}

    def get(self, id):
        todo = TodoList.query.get_or_404(id)
        if todo:
            return {
                "name": todo.name,
            }
        else:
            return {"status": "Error", "message": "car Not Found..."}

    def delete(self, id):
        todo = TodoList.query.get_or_404(id)
        if todo:
            db.session.delete(todo)
            db.session.commit()
            return {"status": "Sucess", "message": "car is deleted sucessfully..."}
        else:
            return {"status": "Error", "message": "car Not Found..."}
