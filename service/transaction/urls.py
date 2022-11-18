from django.urls import path

from . import views

urlpatterns = [
    path('', views.TransactionList.as_view()),
    path('dashboard/', views.DashboardList.as_view()),
]