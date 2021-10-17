# Generated by Django 3.1.7 on 2021-10-16 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('safety_ambassador_program', '0016_auto_20211016_1701'),
    ]

    operations = [
        migrations.AddField(
            model_name='responses',
            name='option_selected',
            field=models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4')], default='1', max_length=1),
        ),
        migrations.AddField(
            model_name='responses',
            name='section',
            field=models.TextField(default=''),
        ),
    ]
