from django.contrib import admin
from .models import Article, Grade, User, Digital, Section

# Register your models here.

admin.site.register(User)
admin.site.register(Article)
admin.site.register(Digital)
admin.site.register(Grade)
admin.site.register(Section)