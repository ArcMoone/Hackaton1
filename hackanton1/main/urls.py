from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('checkAround', views.checkAround),
    path('getUserPoint', views.getUserPoint),
    path('getPoints', views.getPoints),
    path('setPoint', views.setPoint)
]
