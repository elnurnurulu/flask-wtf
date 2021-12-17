from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Email, Length

class RegisterForm(FlaskForm):
    name = StringField(label = 'First Name', validators=[DataRequired(), Length(min=3, max=15)])
    surname = StringField(label = 'Surname', validators=[DataRequired()])
    age = IntegerField(label = 'Age', validators=[DataRequired()])
    email = StringField(label = 'Email', validators=[DataRequired(), Email()])
    about = TextAreaField(label = 'About')
    # course = SelectField(label = 'Course', validators=[DataRequired()])