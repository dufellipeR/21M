from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.db.models import Sum, Avg

from .models import Transaction
from .serializers import TransactionSerializer


class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filterset_fields = ['perfil']

class DashboardList(generics.ListAPIView):
    queryset = Transaction.objects.all()

    def list(self, request, *args, **kwargs):

        q = self.request.query_params.get('q')

        if q:
            perfil_transactions = self.queryset.filter(perfil=q)
        else:
            perfil_transactions = self.queryset

        perfil_amount =  perfil_transactions.aggregate(Sum('amount'))
        perfil_average_price = perfil_transactions.aggregate(Avg('price'))

        res = { 
            'amount': perfil_amount['amount__sum'],
            'average': perfil_average_price['price__avg']
        }
        return  Response(res)

