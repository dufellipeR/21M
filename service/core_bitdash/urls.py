from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('perfil/', include('perfil.urls')),
    path('transaction/', include('transaction.urls')),
    path('analysis/', include('analysis.urls')),
]
