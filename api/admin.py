from django.contrib import admin
from .models import Category, Color, Product
from django.utils.html import format_html


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')          # Колонки в списке
    prepopulated_fields = {'slug': ('name',)}  # Автозаполнение slug по имени
    search_fields = ('name',)                 # Поле поиска

@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('name', 'hex_code')
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock', 'is_active')
    list_filter = ('category', 'color', 'is_active')  # Фильтры справа
    search_fields = ('name', 'sku')
    prepopulated_fields = {'sku': ('name',)}  # Если хочешь автогенерировать артикул (можно убрать)
    list_editable = ('price', 'stock', 'is_active')  # Можно менять прямо в списке
    readonly_fields = ('image_preview',)

    # Для отображения превью картинки в админке
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 100px;" />', obj.image.url)
        return ""
    image_preview.short_description = 'Preview'

