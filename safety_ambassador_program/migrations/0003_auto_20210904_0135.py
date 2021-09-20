# Generated by Django 3.1.7 on 2021-09-03 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('safety_ambassador_program', '0002_auto_20210904_0053'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='end_time',
            field=models.DateTimeField(editable=False, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='start_time',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='user',
            name='time_on_site',
            field=models.IntegerField(editable=False, null=True),
        ),
    ]