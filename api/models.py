from django.db import models
from django.db.models.fields import NullBooleanField
from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework.fields import URLField
# Create your models here.
class Device(models.Model):
    serialnumber = models.CharField(max_length=12, unique=True, blank=False)
    model = models.CharField(max_length=12, blank=True)
    batterylife = models.IntegerField( blank=True, null=True)
    capacity = models.IntegerField( blank=True, null=True)
    status = models.BooleanField(default=True, blank=True)
    removed_from_DEP = models.BooleanField(default=False)
    status_defect = models.BooleanField(default=False)

class Handout(models.Model):
    link = URLField()

