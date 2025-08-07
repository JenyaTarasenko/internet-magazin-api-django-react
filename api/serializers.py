from rest_framework import serializers
from .models import Category, Color, Product, Comment

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'name', 'hex_code']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)  # вложенный объект категории
    color = ColorSerializer(read_only=True)        # вложенный объект цвета

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'sku', 'category', 'color', 'image', 'stock', 'is_active']

#модель коментариев для продуктов
class CommentSerializers(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'user', 'product', 'text', 'created_at']
        read_only_fields = ['user', 'product', 'created_at']
        
        
        
