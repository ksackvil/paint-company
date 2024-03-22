from django.urls import path, include
from .views import list_inventory, update_inventory_item

urlpatterns = [
    path("inventory/", list_inventory),
    path("inventory/<int:id>", update_inventory_item),
]
