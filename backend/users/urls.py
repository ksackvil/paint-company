from django.urls import path
from .views import list_users, get_user, update_user_role

urlpatterns = [
    path("", list_users),
    path("data/", get_user),
    path("<int:id>/update/", update_user_role),
]
