from django.contrib import admin
from django.urls import path, include
from .views import CategoryListAPIView,ProductListAPIView, ProductListByCategoryAPIView



app_name = 'api'
urlpatterns = [
    
    #список всех проектов главная страничка Product.objects.all()
    path('projects/', ProductListAPIView.as_view(), name='api-products'),
    #список всех категорий category.product.all()
    path('categories/', CategoryListAPIView.as_view(), name='api-categories'),
    #список всех проектов принадлежащий этой категории category.product.all()
    path('products/category/<slug:slug>/',ProductListByCategoryAPIView.as_view(), name='products-by-category') 
]