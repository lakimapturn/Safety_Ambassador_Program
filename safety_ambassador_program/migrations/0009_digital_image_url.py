# Generated by Django 3.1.7 on 2021-09-08 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('safety_ambassador_program', '0008_auto_20210908_0857'),
    ]

    operations = [
        migrations.AddField(
            model_name='digital',
            name='image_url',
            field=models.URLField(default=''),
        ),
    ]
