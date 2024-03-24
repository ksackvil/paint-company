from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from .permissions import IsAuthenticatedAdmin


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user(request) -> Response:
    user = get_object_or_404(User, id=request.user.id)
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticatedAdmin])
def list_users(request) -> Response:
    # Get users that are not django admin staff
    users = User.objects.filter(is_superuser=False, is_staff=False)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticatedAdmin])
def update_user_role(request, id) -> Response:
    user = get_object_or_404(User, id=id)
    if user.is_owner:
        # Cannot edit users that are owners
        return Response("User cannot be owner", status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(user, data=request.data, partial=True)
    if not serializer.is_valid():
        # Request.data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer.save()
    return Response(serializer.data)
