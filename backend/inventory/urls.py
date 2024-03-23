from django.urls import path, include
from .views import list_inventory, update_inventory_item

urlpatterns = [
    path("", list_inventory),
    path("<int:id>", update_inventory_item),
]
