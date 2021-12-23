from app import app
from flask import render_template, request, redirect, render_template, session
from flask_login import login_user, login_required, logout_user

from forms import RegisterForm, LoginForm
from models import User

from werkzeug.security import check_password_hash


@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/product")
def product():
    return render_template("product.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/categories")
def categories():
    return render_template("categories.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    post_data = request.form
    form = RegisterForm()
    if request.method == "POST":
        form = RegisterForm(data=post_data)
        if form.validate_on_submit():
            somename = User(
                first_name=form.first_name.data,
                last_name=form.last_name.data,
                username=form.username.data,
                email=form.email.data,
                password=form.password.data,
            )
            somename.save()
    return render_template("register_dinamic.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    post_data = request.form
    form = LoginForm()
    if request.method == "POST":
        form = LoginForm(data=post_data)
        if form.validate_on_submit():
            user = User.query.filter_by(username=form.username.data).first()
            if user and check_password_hash(user.password, form.password.data):
                login_user(user)
                return redirect("/")
            else:
                pass
    return render_template("login.html", form=form)


@app.route("/logout")
@login_required
def logout():
    logout_user()
    if session.get("was_once_logged_in"):
        del session["was_once_logged_in"]
    return redirect("/login")
