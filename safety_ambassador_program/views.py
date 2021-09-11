from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.db import IntegrityError
from django.views.decorators.clickjacking import xframe_options_exempt
from .models import Digital, Grade, User, Article, Section

# Create your views here.

@xframe_options_exempt
@login_required
def index(request):
    # print(user_stats = request.user.objects.user_stats(request.user.start_time, request.user.end_time))
    return render(request, "safety_ambassador_program/index.html", {
        'Digital': Digital.objects.all()
    })

@login_required
def aboutPage(request):
    return render(request, "safety_ambassador_program/about.html", {
        'Digital': Digital.objects.all()
    })

@login_required
def gamesPage(request):
    return render(request, "safety_ambassador_program/games.html", {
        "Digital": Digital.objects.all()
    })

def authenticationPage(request):
    # if request.user.is_authenticated: # prevents user from going to login page if already logged in
    #     return HttpResponseRedirect(reverse("index"))
        
    if request.method == 'POST' and request.POST['purpose'] == "login": # If the user is attempting to login this function runs
        enteredUsername = request.POST["username"]
        enteredPassword = request.POST["password"]
        user = authenticate(request, username = enteredUsername, password = enteredPassword)

        if user is not None: # checking if the user exists or not
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else: # telling the user that the credentials entered are invalid
            return render(request, "safety_ambassador_program/authentication.html", {
                "purpose": "login", 
                "message": "Invalid username and/or password!"
            })
    elif(request.method == 'POST'): # if the user has submitted data this function runs
        enteredUsername = request.POST["username"]
        enteredEmail = request.POST["email"]
        enteredFirstName = request.POST["first_name"]
        enteredLastName = request.POST["last_name"]
        enteredPassword = request.POST["password"]

        # Trying to create a new user
        try: 
            user = User.objects.create_user(username = enteredUsername, email = enteredEmail, password = enteredPassword, first_name = enteredFirstName, last_name = enteredLastName)
            user.save()
        except IntegrityError:
            return render(request, "safety_ambassador_program/authentication.html", {
                "purpose": "registration",
                "message": "Username already taken!"
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "safety_ambassador_program/authentication.html", {
            "purpose": "login"
        })