from rest_framework import serializers
from .models import Device
class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ("serialnumber",
                 "model",
                 "batterylife",
                 "capacity",
                
                 "status",)
class AddDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ("serialnumber",
                 "model",
                 "batterylife",
                 "capacity",
                 
                 "status",)