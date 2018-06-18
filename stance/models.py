from django.db import models
from django.contrib.auth.models import User

class Stock(models.Model):
    symbol = models.CharField(max_length=10)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.symbol
