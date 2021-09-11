from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Grade(models.Model):
    grade = models.CharField(max_length=100)

    def __str__(self):
        return self.grade

class Section(models.Model):
    name = models.CharField(max_length=120)

    def __str__(self):
        return self.name

class User(AbstractUser, models.Model):
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, null = True)

    start_time = models.DateTimeField(auto_now=True, editable=False)
    end_time = models.DateTimeField(null=True, editable=False)

    def __str__(self):
        return self.username


class Digital(models.Model):
    title = models.CharField(blank=False, null=False, max_length=120)
    url = models.URLField(blank=False, null=False)
    description = models.TextField(null=True, blank=True)
    section = models.ForeignKey(Section, on_delete= models.CASCADE, null = True)
    image = models.FileField(blank=True, null=True)

    def __str__(self):
        return self.title

class Article(models.Model):
    name = models.CharField(blank=False, null=False, max_length=120)
    file = models.FileField(blank=False, null=False)

    def __str__(self):
        return self.name