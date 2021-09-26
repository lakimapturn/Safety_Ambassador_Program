# Generated by Django 3.1.7 on 2021-09-25 11:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('safety_ambassador_program', '0014_auto_20210924_0103'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('url', models.URLField()),
                ('description', models.TextField(blank=True, null=True)),
                ('image', models.FileField(blank=True, null=True, upload_to='')),
                ('grade', models.ManyToManyField(default='', related_name='allocated_grade', to='safety_ambassador_program.Grade')),
                ('section', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='safety_ambassador_program.section')),
            ],
        ),
        migrations.DeleteModel(
            name='Digital',
        ),
    ]
