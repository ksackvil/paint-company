from rest_framework import permissions


class IsAuthenticatedOwner(permissions.BasePermission):
    """
    Custom permission to only allow authenticated owners to access the view.
    """

    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.is_owner
