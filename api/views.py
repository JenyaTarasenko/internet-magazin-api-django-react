from rest_framework import generics, permissions
from .models import Category, Color, Product, Comment
from .serializers import CategorySerializer, ColorSerializer, ProductSerializer,CommentSerializers
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

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
    
    
class CreateCommentAPIView(generics.CreateAPIView):
    serializer_class = CommentSerializers
    permission_classes = [permissions.IsAuthenticated]
    
    
    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    def perform_create(self, serializer):
        product_id = self.kwargs['product_id']
        serializer.save(user=self.request.user, product_id=product_id)
        

#детальная страница
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'  # или 'slug',



# список всех коментариев
class ComentListAPIView(generics.ListAPIView):
    serializer_class = CommentSerializers
    permission_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # GET — любое, POST — только авторизованные
      
      
    # def get_queryset(self):
    #     product_id = self.kwargs['product_id']
    #     return Comment.objects.filter(product_id=product_id)
    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        return Comment.objects.filter(product_id=product_id).order_by('-created_at')

    def perform_create(self, serializer):
        product_id = self.kwargs.get('product_id')
        serializer.save(user=self.request.user, product_id=product_id)