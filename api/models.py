from django.db import models

# Create your models here.
class Device(models.Model):
    serialnumber = models.CharField(max_length=12, unique=True)
    model = models.CharField(max_length=12)
    batterylife = models.IntegerField()
    capacity = models.IntegerField()
    status = models.CharField(max_length=7, default='lagernd')



