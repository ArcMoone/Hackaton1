from re import U
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Users, Points
import math

def index(request):
    return render(request, 'main/map.html')

def calculateDistance(lat1, lon1, lat2, lon2):
    lat1 = float(lat1)
    lat2 = float(lat2)
    lon1 = float(lon1)
    lon2 = float(lon2)
    R = 6378.137
    dLat = lat2 * math.pi / 180 - lat1 * math.pi / 180
    dLon = lon2 * math.pi / 180 - lon1 * math.pi / 180
    a = math.sin(dLat/2)**2 + math.cos(lat1 * math.pi / 180) * math.cos(lat2 * math.pi / 180) * math.sin(dLon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = R * c
    return d * 1000

def checkAround(request):
    latitude = request.GET.get('latitude')
    longitude = request.GET.get('longitude')
    points = Points.objects.all()
    users = Users.objects.all()
    isFarAwayFromExistingMarks = True
    result = 0
    for i in points:
        distance = calculateDistance(latitude, longitude, i.Latitude, i.Longitude)
        if distance <= 1000:
            isFarAwayFromExistingMarks = False
    if isFarAwayFromExistingMarks:
        count = 1
        for i in users:
            distance = calculateDistance(latitude, longitude, i.Latitude, i.Longitude)
            if distance <= 500:
                count += 1
        if count >= 1:
            result = 1
    return JsonResponse({'result': result})

def getUserPoint(request):
    userId = request.GET.get('id')
    user = Users.objects.get(id=userId)
    return JsonResponse({'coords':[user.Latitude,user.Longitude]})

def setPoint(request):
    latitude = request.GET.get('latitude')
    longitude = request.GET.get('longitude')
    Points.objects.create(Latitude=latitude, Longitude=longitude)
    return HttpResponse("OK")

def getPoints(request):
    return JsonResponse({'result': 'privet'})