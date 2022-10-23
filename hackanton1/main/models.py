from email.policy import default
from turtle import title
from unittest.util import _MAX_LENGTH
from django.db import models

class Users(models.Model):
    Login = models.CharField(max_length=50)
    Password = models.CharField(max_length=50)
    Latitude = models.FloatField(default=0)
    Longitude = models.FloatField(default=0)

class Points(models.Model):
    Latitude = models.FloatField()
    Longitude = models.FloatField()
    Rating = models.IntegerField(default=0)
