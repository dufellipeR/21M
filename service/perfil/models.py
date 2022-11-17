from django.db import models

# Create your models here.
class Perfil(models.Model):
    name = models.CharField(null=False, blank=False, max_length=64)
    desc = models.CharField(null=True, blank=True, max_length=254)

    def __str__(self) -> str:
        return self.name