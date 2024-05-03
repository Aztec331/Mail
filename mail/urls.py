from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    path("emails", views.compose, name="compose"),
    # for example like emails/1, emails/2 etc 
    path("emails/<int:email_id>", views.email, name="email"),
    # for example like emails/inbox , emails/sent , emails/archive etc
    path("emails/<str:mailbox>", views.mailbox, name="mailbox"),
]
