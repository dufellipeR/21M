from django.urls import path

from . import views

urlpatterns = [
    path('', views.PerfilList.as_view()),
]