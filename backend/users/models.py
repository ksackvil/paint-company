from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Roles(models.IntegerChoices):
        PAINTER = 0, "painter"
        ADMIN = 1, "admin"

    role = models.IntegerField(choices=Roles.choices, default=Roles.PAINTER)
    is_owner = models.BooleanField(default=False)
