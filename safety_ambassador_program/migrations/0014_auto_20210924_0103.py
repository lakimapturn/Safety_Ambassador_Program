# Generated by Django 3.1.7 on 2021-09-23 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('safety_ambassador_program', '0013_digital_intro_completed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='digital',
            name='intro_completed',
        ),
        migrations.AddField(
            model_name='user',
            name='intro_completed',
            field=models.BooleanField(default=False),
        ),
    ]
