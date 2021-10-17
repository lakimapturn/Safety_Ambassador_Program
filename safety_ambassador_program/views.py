from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.db import IntegrityError

from .models import Answer, Game, Grade, User
from .serializers import PostSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class answersAPI(APIView):
    def get(self, request, *args, **kwargs):
        qs = Answer.objects.all()
        serializer = PostSerializer(qs, many=True)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        # qs = Answer.objects.filter()
        # print(request.data)
        # serializer = PostSerializer(data = request.data)
        data = request.data
        print(data["section"])
        answer = Answer.objects.get(section = data["section"])
        print(answer)
        if data["answer"] == 'a':
            answer.a = answer.a + 1
        elif data["answer"] == 'b':
            answer.b = answer.b + 1
        elif data["answer"] == 'c':
            answer.c = answer.c + 1
        elif data["answer"] == 'd':
            answer.d = answer.d + 1
        answer.save()
        serializer = PostSerializer(answer)
        return Response(serializer.data)

@login_required
def index(request):
    # print(user_stats = request.user.objects.user_stats(request.user.start_time, request.user.end_time))
    return render(request, "safety_ambassador_program/index.html")

@login_required
def aboutPage(request):
    return render(request, "safety_ambassador_program/about.html", {
        "totalUsers": User.objects.all().count()
    })

@login_required
def gamesPage(request):
    gradeGames = []
    for game in Game.objects.all(): 
        if request.user.grade in game.grade.all():
            gradeGames.append(game)
    return render(request, "safety_ambassador_program/games.html", {
        "Digital": gradeGames
    })

@login_required
def archive(request):
    return render(request, "safety_ambassador_program/archive.html")

def introCompleted(request):
    request.user.intro_completed = True
    request.user.save()
    return HttpResponseRedirect(reverse('index'))

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
                "loginMessage": "Invalid username and/or password!"
            })
    elif(request.method == 'POST' and request.POST['purpose'] == "register"): # if the user has submitted data this function runs
        enteredUsername = request.POST["loguname"]
        enteredGrade = Grade.objects.get(grade = request.POST["loggrade"])
        enteredFirstName = request.POST["logfname"]
        enteredLastName = request.POST["loglname"]
        enteredPassword = request.POST["logpass"]

        # Trying to create a new user
        try: # add grade 
            user = User.objects.create_user(username = enteredUsername, password = enteredPassword, first_name = enteredFirstName, last_name = enteredLastName,grade = enteredGrade)
            user.save()
        except IntegrityError:
            return render(request, "safety_ambassador_program/authentication.html", {
                "purpose": "registration",
                "registerMessage": "Username already taken!"
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