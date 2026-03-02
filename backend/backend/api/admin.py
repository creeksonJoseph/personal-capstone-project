from django.contrib import admin
from .models import Category, Post, Tag, GalleryImage, PostImage

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at', 'updated_at')
    search_fields = ('name',)
    ordering = ('name',)
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'author', 'status', 'published_at', 'created_at')
    search_fields = ('title', 'author')
    list_filter = ('status', 'categories')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at', 'updated_at')
    search_fields = ('name',)
    ordering = ('name',)
    prepopulated_fields = {'slug': ('name',)}

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('alt_text', 'is_active', 'created_at', 'updated_at')
    search_fields = ('alt_text',)
    list_filter = ('is_active',)

@admin.register(PostImage)
class PostImageAdmin(admin.ModelAdmin):
    list_display = ('alt_text', 'order', 'created_at', 'updated_at')
    search_fields = ('alt_text', 'caption')
    ordering = ('order', '-created_at')
