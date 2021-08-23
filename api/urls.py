from django.urls import path, include
from .views import *
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns = [
    path('devices', DeviceView.as_view()),
    path('device', devices),
    path("device/<int:pk>",device_detail),
    path('device/defect', device_defect),
    path('device/defect/<int:pk>', defect_device_detail),
     path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('handouts/<int:pk>',handout_details),
    path('handouts',handout)
]
urlpatterns = format_suffix_patterns(urlpatterns)