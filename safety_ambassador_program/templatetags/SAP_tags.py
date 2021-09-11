from django import template

register = template.Library()

from ..models import User

@register.simple_tag
def check_about_url(request):
    if request.path == '':
        return False
    else:
        return True
