from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_users(request) -> Response:
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_user_role(request, id) -> Response:
    user = get_object_or_404(User, id=id)
    if user.is_owner:
        # Only one owner set manually, not allowed to edit owners
        return Response("User cannot be owner", status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
