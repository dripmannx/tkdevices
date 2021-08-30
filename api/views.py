from django.http import HttpResponse
from datetime import datetime
from rest_framework import generics
from rest_framework.response import Response
from .serializers import DeviceSerializer, DeleteDeviceSerializer, HandoutSerializer
from .models import Device, Handout
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.authentication import  BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

@api_view(['GET'])
@authentication_classes([TokenAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def example_view(request, format=None):
    content = {
        'user': str(request.user),  # `django.contrib.auth.User` instance.
       
    }
    return Response(content)
@api_view(['GET', 'POST'])
def handout(request):
    """
    Get all Handouts
    """
    if request.method == 'GET':
        devices = Handout.objects.all().order_by('is_shipped')
        serializer = HandoutSerializer(devices, many=True)
        return JsonResponse(serializer.data, safe=False,status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = HandoutSerializer(data=data)
        
        if serializer.is_valid():
            
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
@api_view(['GET', 'PUT', 'DELETE'])
def handout_details(request, pk):
    
    #Retrieve, update or delete a device.
    
    try:
        handout = Handout.objects.get(pk=pk)

    except Handout.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = HandoutSerializer(handout)
        return JsonResponse(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = HandoutSerializer(handout, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        handout.delete()
        return HttpResponse(status=204)






class DeviceView(generics.CreateAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer


@api_view(['GET', 'POST'])
def devices(request):
    """
    Get all non defect Devices and add a Device
    """
    if request.method == 'GET':
        devices = Device.objects.filter(status_defect=False, status=True).order_by('-batterylife','-status')
        serializer = DeviceSerializer(devices, many=True)
        return JsonResponse(serializer.data, safe=False,status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = DeviceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
@api_view(['GET', 'PUT', 'DELETE'])
def device_detail(request, pk):
    
    #Retrieve, update or delete a device.
    
    try:
        device = Device.objects.get(pk=pk)

    except Device.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = DeviceSerializer(device)
        return JsonResponse(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = DeviceSerializer(device, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        device.delete()
        return HttpResponse(status=204)



@api_view(['GET', 'POST'])
def device_defect(request):
    if request.method == 'GET':
        devices = Device.objects.filter(status_defect=True, removed_from_DEP=False)
        serializer = DeleteDeviceSerializer(devices, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = DeleteDeviceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
@api_view(['GET', 'PUT', 'DELETE'])
def defect_device_detail(request, pk):
    #Retrieve, update or delete a device.
    try:
        device = Device.objects.get(pk=pk)

    except Device.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = DeleteDeviceSerializer(device)
        return JsonResponse(serializer.data)
#TODO impliment a way to handle removed devices
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = DeleteDeviceSerializer(device, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        device.delete()
        return HttpResponse(status=204)