from django.contrib import admin
from .models import Grade, User, Game, Answer

# Register your models here.

admin.site.site_header = 'Safety Ambassador Program Admin Dashboard'
admin.site.register(User)
admin.site.register(Game)
admin.site.register(Grade)
admin.site.register(Answer)