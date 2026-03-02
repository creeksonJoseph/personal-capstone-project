from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import cloudinary.uploader
import logging

logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_cloudinary_image(request):
    """
    Delete an image from Cloudinary using its public_id
    """
    try:
        public_id = request.data.get('public_id')
        
        if not public_id:
            return Response(
                {'error': 'public_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        logger.info(f"Attempting to delete image from Cloudinary: {public_id}")
        
        # Delete from Cloudinary
        result = cloudinary.uploader.destroy(public_id)
        
        logger.info(f"Cloudinary deletion result: {result}")
        
        if result.get('result') == 'ok':
            return Response(
                {'message': 'Image deleted successfully', 'result': result},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'Failed to delete image', 'detail': result},
                status=status.HTTP_400_BAD_REQUEST
            )
            
    except Exception as e:
        logger.error(f"Error deleting image from Cloudinary: {str(e)}")
        return Response(
            {'error': 'Failed to delete image', 'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
