# app/models/__init__.py

from app import db


class TodoList(db.Model):
    __tablename__ = 'todoList'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<todoList {self.name}>"
