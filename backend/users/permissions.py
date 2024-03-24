from rest_framework import permissions
from .models import User


class IsAuthenticatedAdmin(permissions.BasePermission):
    """
    Custom permission to only allow authenticated owners to access the view.
    """

    def has_permission(self, request, view) -> bool:
        user = request.user
        return user.is_authenticated and user.role == User.Roles.ADMIN
