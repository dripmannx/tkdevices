from rest_framework import serializers
from .models import Device, Handout,Data,User
class User(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ('username','user_permissions','email','groups','is_staff','is_active')

class DataSerializer(serializers.ModelSerializer):
    size = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    filetype = serializers.SerializerMethodField()
    since_added = serializers.SerializerMethodField()
    class Meta:
        model = Data
        fields = ('file_id', 'file', 'since_added', 'size', 'name', 'filetype')
    def get_size(self, obj):
        file_size = ''
        if obj.file and hasattr(obj.file, 'size'):
            file_size = obj.file.size
        return file_size
    def get_name(self, obj):
        file_name = ''
        if obj.file and hasattr(obj.file, 'name'):
            file_name = obj.file.name
        return file_name
    def get_filetype(self, obj):
      filename = obj.file.name
      return filename.split('.')[-1]
    def get_since_added(self, obj):
        date_added = obj.date_created
        return date_added
 
class HandoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Handout
        fields = ('id','link', 'is_shipped','owner','timestamp')
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
                  "status_defect",
                  "model")
