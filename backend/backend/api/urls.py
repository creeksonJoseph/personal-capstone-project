from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.auth_views import LoginView, LogoutView, CheckAuthView
from .views.post_views import PostViewSet, CategoryViewSet, GalleryImageViewSet
from .views.cloudinary_views import generate_signature
from .views.cloudinary_delete_view import delete_cloudinary_image


# Create router for viewsets
router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'gallery-images', GalleryImageViewSet, basename='gallery-image')

urlpatterns = [
    # Auth endpoints
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('check-auth/', CheckAuthView.as_view(), name='check-auth'),
    
    # Cloudinary endpoints
    path('cloudinary/signature/', generate_signature, name='cloudinary-signature'),
    path('cloudinary/delete/', delete_cloudinary_image, name='cloudinary-delete'),
    
    # API endpoints
    path('', include(router.urls)),
]
