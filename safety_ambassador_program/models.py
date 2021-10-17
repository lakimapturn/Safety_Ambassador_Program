from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator 

# Create your models here.

class Answer(models.Model):
    section = models.CharField(choices=[('Id', 'Identity'), ('Sa', 'Safety'), ('Se', 'Security'), ('We', 'Wellbeing')], null=False, blank=False, default='', max_length=2)
    a = models.IntegerField(default=0, null=True, blank=True)
    b = models.IntegerField(default=0, null=True, blank=True)
    c = models.IntegerField(default=0, null=True, blank=True)
    d = models.IntegerField(default=0, null=True, blank=True)

    def __str__(self):
        return str(self.section)

class Grade(models.Model):
    grade = models.IntegerField(default = 3, validators=[MinValueValidator(3), MaxValueValidator(8)])

    def __str__(self):
        return "Grade " + str(self.grade)

    class Meta:
        	ordering = ('-grade',)

class User(AbstractUser, models.Model):
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, null = True)
    start_time = models.DateTimeField(auto_now=True, editable=False)
    end_time = models.DateTimeField(null=True, editable=False)
    intro_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.username


class Game(models.Model):
    title = models.CharField(blank=False, null=False, max_length=120)
    url = models.URLField(blank=False, null=False)
    description = models.TextField(null=True, blank=True)
    image = models.FileField(blank=True, null=True)
    grade = models.ManyToManyField(Grade, related_name="allocated_grade", blank=False, default = "")

    def __str__(self):
        return self.title

class Article(models.Model):
    name = models.CharField(blank=False, null=False, max_length=120)
    file = models.FileField(blank=False, null=False)

    def __str__(self):
        return self.name