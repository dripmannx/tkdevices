from django.db import models
from django.core.validators import RegexValidator
from django.db.models.fields import NullBooleanField
from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework.fields import URLField
from datetime import datetime
import qrcode
from io import BytesIO


from django.urls import reverse
from django.core.files.uploadedfile import InMemoryUploadedFile


class Device(models.Model):
    serialnumber = models.CharField(validators=[RegexValidator(regex='^.{12}$', message='Length has to be 4', code='nomatch')],max_length=12, unique=True, blank=False)
    model = models.CharField(max_length=12, blank=True)
    batterylife = models.IntegerField( blank=True, null=True)
    capacity = models.IntegerField( blank=True, null=True)
    status = models.BooleanField(default=True, blank=True)
    removed_from_DEP = models.BooleanField(default=False)
    status_defect = models.BooleanField(default=False)
    qrcode = models.ImageField(upload_to='qrcode', blank=True, null=True)
    def get_absolute_url(self):
        return reverse('tkdevices.views.details', args=[str(self.id)])

    def generate_qrcode(self):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=6,
            border=0,
        )
        qr.add_data(self.get_absolute_url())
        qr.make(fit=True)

        img = qr.make_image()

        buffer = BytesIO()
        img.save(buffer)
        filename = f'device-{self.id}.png'
        filebuffer = InMemoryUploadedFile(
            buffer, None, filename, 'image/png', buffer.len, None)
        self.qrcode.save(filename, filebuffer)
class Handout(models.Model):
    link = models.URLField()
    is_shipped = models.BooleanField(default=False)
    owner = models.CharField(default="system" ,max_length=20)
    timestamp = models.DateTimeField(default=datetime.now)
