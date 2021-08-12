from django.db import models

# Create your models here.
class Device(models.Model):
    serialnumber = models.CharField(max_length=12, unique=True)
    model = models.CharField(max_length=12)
    batterylife = models.IntegerField()
    capacity = models.IntegerField()
    status = models.BooleanField(default=True)
    removed_from_DEP = models.BooleanField(default=False)
    status_defect = models.BooleanField(default=False)





