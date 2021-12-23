from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, Length

class RegisterForm(FlaskForm):
    first_name = StringField(label = 'First Name', validators=[DataRequired(), Length(min=3, max=30)])
    last_name = StringField(label = 'Last Name', validators=[DataRequired(), Length(min=3, max=30)])
    username = StringField(label = 'Username', validators=[DataRequired(), Length(min=3, max=30)])
    email = StringField(label = 'Email', validators=[DataRequired(), Email(), Length(min=3, max=30)])
    password = StringField(label = 'Password', validators=[DataRequired(), Length(min=8, max=30)])


class LoginForm(FlaskForm):
    username = StringField(label = 'Username', validators=[DataRequired(), Length(min=3, max=30)])
    password = StringField(label = 'Password', validators=[DataRequired(), Length(min=8, max=30)])