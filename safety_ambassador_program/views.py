from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.db import IntegrityError
from django.views.decorators.clickjacking import xframe_options_exempt, xframe_options_sameorigin
from .models import Digital, Grade, User, Article, Section

# Create your views here.

@login_required
@xframe_options_exempt
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
        enteredUsername = request.POST["loguser"]
        enteredPassword = request.POST["logpass"]
        user = authenticate(request, username = enteredUsername, password = enteredPassword)

        if user is not None: # checking if the user exists or not
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else: # telling the user that the credentials entered are invalid
            return render(request, "safety_ambassador_program/authentication.html", {
                "purpose": "login", 
                "message": "Invalid username and/or password!"
            })
    elif(request.method == 'POST' and request.POST['purpose'] == "register"): # if the user has submitted data this function runs
        enteredUsername = request.POST["loguname"]
        enteredGrade = request.POST["loggrade"]
        enteredFirstName = request.POST["logfname"]
        enteredPassword = request.POST["logpass"]

        # Trying to create a new user
        try: # add grade 
            user = User.objects.create_user(username = enteredUsername, password = enteredPassword, first_name = enteredFirstName)
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

def logoutPage(request): # function to log user out
	logout(request)
	return render(request, "safety_ambassador_program/authentication.html", {
			"purpose": "login"
		})