# Generated by Django 3.2.5 on 2021-09-01 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_device_serialnumber'),
    ]

    operations = [
        migrations.AddField(
            model_name='device',
            name='qrcode',
            field=models.ImageField(blank=True, null=True, upload_to='qrcode'),
        ),
    ]
