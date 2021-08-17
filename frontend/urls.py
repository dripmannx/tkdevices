from django.urls import path
from .views import index

urlpatterns = [
    path("", index),
    path("defect", index),
    path("handout", index)
    
    ]