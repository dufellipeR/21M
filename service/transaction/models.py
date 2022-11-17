from django.db import models

from perfil.models import Perfil

# Create your models here.
class Transaction(models.Model):
    class TransactionSide(models.IntegerChoices):
        BUY = 1, ('Buy')
        SELL = 2, ('Sell')
    price = models.FloatField()
    amount = models.FloatField()
    total = models.FloatField()
    side = models.IntegerField(choices=TransactionSide.choices)
    perfil = models.ForeignKey(
        Perfil, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField( auto_now=True)

    def __str__(self) -> str:
        return str(self.amount) + ' ' + str(self.total)