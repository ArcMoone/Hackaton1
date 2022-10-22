from turtle import title
from unittest.util import _MAX_LENGTH
from django.db import models

class Users(models.Model):
    Login = models.CharField(max_length=50)
    Password = models.CharField(max_length=50)
    Latitude = models.FloatField(null=True)
    Longitude = models.FloatField(null=True)

class Points(models.Model):
    Latitude = models.FloatField()
    Longitude = models.FloatField()
