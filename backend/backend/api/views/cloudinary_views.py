from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
import cloudinary.uploader
import time


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def generate_signature(request):
    """
    Generate a signature for Cloudinary signed uploads.
    
    This endpoint is protected and requires authentication to prevent
    unauthorized uploads to your Cloudinary account.
    
    Expected request body:
    {
        "folder": "blog-posts/featured" or "blog-posts/gallery" or "gallery"
    }
    
    Returns:
    {
        "signature": "...",
        "timestamp": 1234567890,
        "api_key": "...",
        "cloud_name": "...",
        "upload_preset": "birch"
    }
    """
    try:
        if request.method == 'GET':
            folder = request.query_params.get('folder', 'uploads')
        else:
            folder = request.data.get('folder', 'uploads')
        timestamp = int(time.time())
        
        # Parameters to sign
        params_to_sign = {
            'timestamp': timestamp,
            'folder': folder,
            'upload_preset': settings.CLOUDINARY_UPLOAD_PRESET,
        }
        
        # Generate signature using Cloudinary's utility
        signature = cloudinary.utils.api_sign_request(
            params_to_sign,
            settings.CLOUDINARY_API_SECRET
        )
        
        return Response({
            'signature': signature,
            'timestamp': timestamp,
            'api_key': settings.CLOUDINARY_API_KEY,
            'cloud_name': settings.CLOUDINARY_CLOUD_NAME,
            'upload_preset': settings.CLOUDINARY_UPLOAD_PRESET,
            'folder': folder,
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': 'Failed to generate signature',
            'detail': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
