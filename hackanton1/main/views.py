from re import U
from django.shortcuts import render
from django.http import JsonResponse
from .models import Users, Points

def index(request):
    return render(request, 'main/map.html')

def lookAround(request):
    pass

def getUserPoint(request):
    userId = request.GET.get('id')
    user = Users.objects.get(id=userId)
    return JsonResponse({'coords':[user.Latitude,user.Longitude]})

def getPoints(request):
    return JsonResponse({'result': 'privet'})