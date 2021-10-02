from django.contrib import admin
from .models import Article, Grade, User, Game

# Register your models here.

admin.site.site_header = 'Safety Ambassador Program Admin Dashboard'
admin.site.register(User)
admin.site.register(Article)
admin.site.register(Game)
admin.site.register(Grade)
