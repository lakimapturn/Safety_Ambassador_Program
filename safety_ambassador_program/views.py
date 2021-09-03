from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, "safety_ambassador_program/index.html")