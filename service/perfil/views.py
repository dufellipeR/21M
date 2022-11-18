from django.shortcuts import render
from rest_framework import generics

from .models import Perfil
from .serializers import PerfilSerializer

# Create your views here.

class PerfilList(generics.ListCreateAPIView):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer

