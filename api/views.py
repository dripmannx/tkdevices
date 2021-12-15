from django.http import HttpResponse
from rest_framework import generics
from .serializers import DeviceSerializer, DeleteDeviceSerializer, HandoutSerializer,MyTokenObtainPairSerializer
from .models import *
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes
from rest_framework.decorators import permission_classes
from django.contrib.auth.decorators import permission_required
from .serializers import DataSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.admin.views.decorators import staff_member_required








class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def file_provider(request, format=None):
    if request.method == 'GET':
        files = Data.objects.all().order_by('since_added')
        serializer = DataSerializer(files, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = DataSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
 

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def file_provider_view(request, pk):

    # Retrieve, update or delete a device.

    try:
        file = Data.objects.get(pk=pk)

    except Data.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = DataSerializer(file)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = DataSerializer(file, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        file.delete()
        return HttpResponse(status=204)






    
    

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@staff_member_required
def handout(request):
    
    """
    Get all Handouts
    """
    logged_in_user = User.objects.get(username=request.user.username)
    if request.method == 'GET':
        devices = Handout.objects.all().order_by('is_shipped')
        serializer = HandoutSerializer(devices, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = HandoutSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@staff_member_required
def handout_details(request, pk):

    # Retrieve, update or delete a device.

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
@permission_classes([IsAuthenticated])
@staff_member_required
def devices(request):
    

    """
    Get all non defect Devices and add a Device
    """
    if request.method == 'GET':
        queryset = Device.objects.filter(
            condition=False).order_by('-batterylife', '-status')
        serializer = DeviceSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = DeviceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@staff_member_required
def device_detail(request, serialnumber):
    
    # Retrieve, update or delete a device.
    try:
            queryset = Device.objects.get(serialnumber=serialnumber)
       
    except Device.DoesNotExist:
        return HttpResponse(status=404)
    
  
    

    if request.method == 'GET':
        serializer = DeviceSerializer(queryset)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        
        serializer = DeviceSerializer(queryset, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        
        queryset.delete()
        return HttpResponse(status=204)
        
@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
@staff_member_required
def device_defect(request):
    if request.method == 'GET':
        
        devices = Device.objects.filter(
            condition=True, removed_from_DEP=False)
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
@permission_classes([IsAuthenticated])
@staff_member_required
def defect_device_detail(request, serialnumber):
    # Retrieve, update or delete a device.
    try:
        device = Device.objects.get(serialnumber=serialnumber)
 
    except Device.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = DeleteDeviceSerializer(device)
        return JsonResponse(serializer.data)
# TODO impliment a way to handle removed devices
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
