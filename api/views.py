from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from .serializers import DeviceSerializer, DeleteDeviceSerializer
from .models import Device
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
class DeviceView(generics.CreateAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer



@csrf_exempt
def devices(request):
    """
    Get all non defect Devices and add a Device
    """
    if request.method == 'GET':
        devices = Device.objects.filter(status_defect=False, status=True)
        serializer = DeviceSerializer(devices, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = DeviceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
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




@csrf_exempt
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
@csrf_exempt
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