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

        perfil = self.request.query_params.get('perfil')

        if perfil:
            perfil_transactions = self.queryset.filter(perfil=perfil)
        else:
            perfil_transactions = self.queryset
        
        perfil_transactions_buy = perfil_transactions.filter(side=1)
        perfil_transactions_sell = perfil_transactions.filter(side=2)

        perfil_amount_buy =  perfil_transactions_buy.aggregate(Sum('amount'))
        perfil_amount_sell =  perfil_transactions_sell.aggregate(Sum('amount'))

        perfil_amount = perfil_amount_buy['amount__sum']

        if perfil_amount_buy['amount__sum'] and perfil_amount_sell['amount__sum']:
            perfil_amount = perfil_amount_buy['amount__sum'] - perfil_amount_sell['amount__sum']


        perfil_average__sell_price = perfil_transactions_sell.aggregate(Avg('price'))
        perfil_average__buy_price = perfil_transactions_buy.aggregate(Avg('price'))

        res = { 
            'amount': perfil_amount,
            'average_buy': perfil_average__buy_price['price__avg'],
            'average_sell': perfil_average__sell_price['price__avg']
        }
        return  Response(res)

