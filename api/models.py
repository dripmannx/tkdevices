from django.db import models
from django.core.validators import RegexValidator
from django.db.models.fields import NullBooleanField
from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework.fields import URLField
from datetime import datetime




from django.urls import reverse
from django.core.files.uploadedfile import InMemoryUploadedFile

from django.db import models
from django.utils import timezone
class Data(models.Model):
    file_id = models.AutoField(primary_key=True)
    file = models.FileField(null=True, max_length=255)
    date_created = models.DateTimeField(default = timezone.now)
    def __str__(self):
        return str(self.file.name)
class Device(models.Model):
   
    serialnumber = models.CharField(validators=[RegexValidator(regex='^.{12}$', message='Length has to be 4', code='nomatch')],max_length=12, unique=True, blank=False)
    model = models.CharField(max_length=12, blank=True)
    batterylife = models.IntegerField( blank=True, null=True)
    capacity = models.IntegerField( blank=True, null=True)
    status = models.BooleanField(default=True, blank=True)
    removed_from_DEP = models.BooleanField(default=False)
    status_defect = models.BooleanField(default=False)
   
    
class Handout(models.Model):
    link = models.URLField()
    is_shipped = models.BooleanField(default=False)
    owner = models.CharField(default="system" ,max_length=20)
    timestamp = models.DateTimeField(default=datetime.now)
   