from django.urls import path, include
from .views import DeviceView, devices, device_detail

urlpatterns = [
    path('devices', DeviceView.as_view()),
    path('device', devices),
    path("device/<pk>",device_detail)
]