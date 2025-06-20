from rest_framework import generics
from .models import Category, Color, Product
from .serializers import CategorySerializer, ColorSerializer, ProductSerializer

# список ктегории
class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# список продуктов 
class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer


# список всех товаров этой категории 
class ProductListByCategoryAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        slug = self.kwargs['slug']
        return Product.objects.filter(category__slug=slug)
     
    # def get_queryset(self):
    #     category_slug = self.kwargs.get('slug')
    #     return Product.objects.filter(category__slug=category_slug)
    