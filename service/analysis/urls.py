from django.urls import path

from . import views

urlpatterns = [
    path('', views.Analysis.as_view()),
    
]