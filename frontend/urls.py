from django.urls import path
from .views import index

urlpatterns = [
    path("", index),
    path("devices",index),
    path("defect", index),
    path("handout", index),
    path("logout", index)
    ]