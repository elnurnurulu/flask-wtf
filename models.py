from extensions import *

class Course(db.Model):
    id = db.Column(db.Integer(), primary_key = True)
    title = db.Column(db.String(15), nullable = False)

    def __repr__(self):
        return self.title

    def __init__(self, title):
        self.title = title

    def save(self):
        db.session.add(self)
        db.session.commit()

class Students(db.Model):
    id = db.Column(db.Integer(), primary_key = True)
    name = db.Column(db.String(15), nullable = False)
    surname = db.Column(db.String(15), nullable = False)
    age = db.Column(db.Integer(), nullable = True)
    email = db.Column(db.String(30), nullable = False)
    about = db.Column(db.Text, nullable = True)
    course = db.Column(db.Integer(), db.ForeignKey('course.id'), nullable = False)

    def __repr__(self):
        return self.name

    def __init__(self, name, surname, age, email, about, course):
        self.name = name
        self.surname = surname
        self.age = age
        self.email = email
        self.about = about
        self.course = course

    def save(self):
        db.session.add(self)
        db.session.commit()

