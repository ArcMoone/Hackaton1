from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('lookAround', views.lookAround),
    path('getUserPoint', views.getUserPoint),
    path('getPoints', views.getPoints)
]
