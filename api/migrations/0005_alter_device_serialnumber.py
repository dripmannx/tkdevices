# Generated by Django 3.2.8 on 2021-12-12 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_device_serialnumber'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='serialnumber',
            field=models.CharField(max_length=12, unique=True),
        ),
    ]
