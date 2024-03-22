from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings


class Inventory(models.Model):
    class Status(models.IntegerChoices):
        AVAILABLE = 0, "available"
        RUNNING_LOW = 1, "running low"
        OUT_OF_STOCK = 2, "out of stock"

    name = models.CharField(max_length=50)
    count = models.IntegerField(
        default=0,
        validators=[
            MinValueValidator(settings.INVENTORY_MIN_COUNT),
            MaxValueValidator(settings.INVENTORY_MAX_COUNT),
        ],
    )
    status = models.IntegerField(choices=Status.choices, default=Status.OUT_OF_STOCK)

    def __str__(self):
        return f"{self.name}"
