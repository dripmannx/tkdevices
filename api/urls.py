from django.urls import path, include
from .views import DeviceView, devices, device_defect, device_detail, defect_device_detail

urlpatterns = [
    path('devices', DeviceView.as_view()),
    path('device', devices),
    path("device/<int:pk>",device_detail),
    path('device/defect', device_defect),
    path('device/defect/<int:pk>', defect_device_detail),
]
