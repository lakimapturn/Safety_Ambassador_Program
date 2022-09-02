from django.urls import path, re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    path('', views.index, name="index"),
    path('about', views.aboutPage, name="about"),
    path('archive', views.archive, name="archive"),
    path('authentication-page', views.authenticationPage, name="authentication_page"),
    path('games', views.gamesPage, name="games_page"),
    path('authentication', views.authenticationPage, name="authentication"),
    path('leaderboard', views.leaderboard, name="leaderboard"),
    path('intro-completed', views.introCompleted, name="intro_completed"),
    path('logout', views.logoutPage, name="logout"),
    path('user/responses', views.answersAPI.as_view(), name = "student_responses"),
    path('user/score', views.scoreAPI.as_view(), name = "student_score"),
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}), 
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)