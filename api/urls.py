from django.urls import path, include
from .views import DeviceView, devices, device_detail

urlpatterns = [
    path('device', DeviceView.as_view()),
    path('all', devices),
    path("detail/<pk>",device_detail)
]