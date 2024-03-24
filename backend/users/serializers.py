from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "role"]

    def update(self, instance, validated_data):
        # Only allow updating the 'role' field
        instance.role = validated_data.get("role", instance.role)
        instance.save()
        return instance
