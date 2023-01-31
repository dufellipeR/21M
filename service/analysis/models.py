from django.db import models

# Create your models here.
class Index(models.Model):
    score = models.IntegerField(blank=False, null=False, default=0)
    bitcoin_price = models.FloatField()
    created_at = models.DateTimeField(auto_now=True)