from django.contrib import admin
from django.urls import path, include
from api.views import UserViewSet, CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth', include('rest_framework.urls')),
    path('api/', include('api.urls')),
]
