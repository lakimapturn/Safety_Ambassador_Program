from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Grade(models.Model):
    grade = models.CharField(max_length=100)

    def __str__(self):
        return self.grade

class User(AbstractUser, models.Model):
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.username


class Game(models.Model):
    name = models.CharField(blank=False, null=False, max_length=120)
    url = models.URLField(blank=False, null=False)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class Article(models.Model):
    name = models.CharField(blank=False, null=False, max_length=120)
    file = models.FileField(blank=False, null=False)

    def __str__(self):
        return self.name
