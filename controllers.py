from app import app
from flask import render_template, request

from forms import RegisterForm
from models import Students, Course

@app.route("/register", methods = ["GET", "POST"])
def register():
    post_data = request.form
    form = RegisterForm()
    if request.method == "POST":
        form = RegisterForm(data = post_data)
        if form.validate_on_submit():
            somename = Students(name=form.name.data, surname=form.surname.data, age=form.age.data, email=form.email.data, about=form.about.data, course=form.course.data)
            somename.save()
    return render_template("register_dinamic.html", form = form) 