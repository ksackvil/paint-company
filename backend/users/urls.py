from django.urls import path
from .views import list_users, update_user_role

urlpatterns = [
    path("", list_users),
    path("<int:id>/", update_user_role),
]
