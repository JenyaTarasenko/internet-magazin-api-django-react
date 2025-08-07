from django.conf.urls.static import static  # Добавь этот импорт
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.generic import TemplateView

urlpatterns = [
    # http://127.0.0.1:8001/api/projects/
    path('admin/', admin.site.urls),
    #аунтификация протестировать http://localhost:8001/api/auth/users/ 
    #аунтификация работает без модели из коробки 
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/auth/', include('djoser.urls.authtoken')),      # Получение токена (login/logout)
    
    path('api/', include('api.urls', namespace='api')),#app_name
    path("", TemplateView.as_view(template_name="base.html")),
]
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)