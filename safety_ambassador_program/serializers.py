from django.db.models import fields
from rest_framework import serializers

from .models import Answer

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = (
            'section', 'a', 'b', 'c', 'd', 'grade'
        )
        depth=1