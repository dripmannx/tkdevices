from django.urls import path, include
from .views import DeviceView, devices, device_detail, device_countin

urlpatterns = [
    path('devices', DeviceView.as_view()),
    path('device', devices),
    path("device/<pk>",device_detail),
    path("device/in", device_countin),
]