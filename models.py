from extensions import db, login_manager
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer(), primary_key = True)
    first_name = db.Column(db.String(30), nullable = False)
    last_name = db.Column(db.String(30), nullable = False)
    username = db.Column(db.String(30), nullable = False)
    email = db.Column(db.String(30), nullable = False)
    password = db.Column(db.String(255), nullable = False)
    is_active = db.Column(db.Boolean, nullable = False)
    is_superuser = db.Column(db.Boolean, nullable = False)

    def __init__(self, first_name, last_name, username, email, password, is_active=True, is_superuser=False):
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)
        self.is_active = is_active
        self.is_superuser = is_superuser

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, new_password):
        self.password = generate_password_hash(new_password)

    def check_password(self, password):
        return check_password_hash(self.password, password)