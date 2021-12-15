from django.urls import path, include
from .views import *
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
   
    path('device', devices),
    path("device/<str:serialnumber>",device_detail, name="device_detail"),
    path('devices/defect', device_defect),
    path('devices/defect/<str:serialnumber>', defect_device_detail),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('handouts/<int:pk>',handout_details),
    path('handouts',handout),
]
urlpatterns = format_suffix_patterns(urlpatterns)
