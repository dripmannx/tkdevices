from django.db.models import query
from django.http import HttpResponse
from datetime import datetime
from rest_framework import generics
from rest_framework.response import Response
from .serializers import DeviceSerializer, DeleteDeviceSerializer, HandoutSerializer
from .models import *
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes
from rest_framework.decorators import permission_classes
from django.contrib.auth.decorators import login_required, permission_required
from rest_framework.permissions import DjangoObjectPermissions
from .serializers import DataSerializer


from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
#Custom TokenObtainPairView, adding username to the token encoded
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        logged_in_user = User.objects.get(username=user)
 
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            "username":user.username,
            "permissions":str(user.get_all_permissions()),

        })

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
@authentication_classes([TokenAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
@permission_required('api.change_data', 'api.view_data', raise_exception=True)
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





@api_view(['GET'])
@authentication_classes([TokenAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def user(request, format=None):
    logged_in_user = User.objects.get(username=request.user.username)
    content = {
        'username': str(logged_in_user) ,#`django.contrib.auth.User` instance.
        #`django.models.User
        "permissions":logged_in_user.get_all_permissions(),
        "full_name":str(logged_in_user.get_full_name()),
        "first_name":str(logged_in_user.get_short_name()),
        "email":str(logged_in_user.email),


    }
    
    
    return Response(content)

@api_view(['GET'])
@authentication_classes([TokenAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def permissions(request, format=None):
    logged_in_user = User.objects.get(username=request.user.username)
    content = {
        "permissions":logged_in_user.get_all_permissions()
        #`django.models.User
    }
    
    
    return Response(content)

@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def handout(request):
    
    """
    Get all Handouts
    """
    logged_in_user = User.objects.get(username=request.user.username)
    if request.method == 'GET':
        if logged_in_user.has_perm('api.view_handout'):
            devices = Handout.objects.all().order_by('is_shipped')
            serializer = HandoutSerializer(devices, many=True)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        return Response(status=403)
    elif request.method == 'POST':
        if logged_in_user.has_perm('api.add_handout'):
            data = JSONParser().parse(request)
            serializer = HandoutSerializer(data=data)

            if serializer.is_valid():
                print("is valid")
                serializer.save()
                return JsonResponse(serializer.data, status=201)
            print("is not")
            return JsonResponse(serializer.errors, status=400)
        return Response(status=403)

@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([TokenAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
@permission_required('api.change_handout','api.view_handout',raise_exception=True)
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
def devices(request):
    """
    Get all non defect Devices and add a Device
    """
    logged_in_user = User.objects.get(username=request.user.username)
    

    if request.method == 'GET':
        if logged_in_user.has_perm('api.view_device'):
            queryset = Device.objects.filter(
                status_defect=False).order_by('-batterylife', '-status')
            serializer = DeviceSerializer(queryset, many=True)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        return Response(status=403)
    elif request.method == 'POST':
        if logged_in_user.has_perm('api.add_device'):
            data = JSONParser().parse(request)
            serializer = DeviceSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=201)
            return JsonResponse(serializer.errors, status=400)
        return Response(status=403)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def device_detail(request, serialnumber):
    logged_in_user = User.objects.get(username=request.user.username)
    
    # Retrieve, update or delete a device.
    try:
            queryset = Device.objects.get(serialnumber=serialnumber)
       
    except Device.DoesNotExist:
        return HttpResponse(status=404)
    
  
    

    if request.method == 'GET':
        if logged_in_user.has_perm('api.view_device'):
            serializer = DeviceSerializer(queryset)
            return JsonResponse(serializer.data)
        return Response(status=403)

    elif request.method == 'PUT':
        if logged_in_user.has_perm('api.change_device'):
            data = JSONParser().parse(request)
            
            serializer = DeviceSerializer(queryset, data=data)
            if serializer.is_valid():
                print(data)
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)
        return Response(status=403)
    elif request.method == 'DELETE':
        if logged_in_user.has_perm('api.delete_device'):
            queryset.delete()
            return HttpResponse(status=204)
        return Response(status=403)

@authentication_classes([TokenAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
@permission_required(['api.view_device','api.add_device'],raise_exception=True)
def device_defect(request):
    
    if request.method == 'GET':
        
        devices = Device.objects.filter(
            status_defect=True, removed_from_DEP=False)
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
@authentication_classes([TokenAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
@permission_required('api.change_device','api.view_device',raise_exception=True)
def defect_device_detail(request, serialnumber):
    # Retrieve, update or delete a device.
    try:
        device = Device.objects.get(serialnumber=serialnumber)
        print(device)
 
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
