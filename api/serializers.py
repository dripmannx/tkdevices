from rest_framework import serializers
from .models import Device


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ("id",
                  "serialnumber",
                  "model",
                  "batterylife",
                  "capacity",
                  "status", 
                  "removed_from_DEP",
                  "status_defect")


class DeleteDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ("id",
                  "serialnumber",
                  "removed_from_DEP",
                  "status_defect")
