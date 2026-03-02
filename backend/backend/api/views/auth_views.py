from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.conf import settings
import jwt
from datetime import datetime, timedelta
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        import logging
        logger = logging.getLogger(__name__)
        logger.debug(f"Login request received: {request}")
        logger.debug(f"Request headers: {request.headers}")
        logger.debug(f"Request body: {request.data}")
        
        username = request.data.get('username')
        password = request.data.get('password')
        
        logger.debug(f"Username: {username}, Password provided: {password is not None}")
        
        if not username or not password:
            logger.warning("Missing username or password")
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(request, username=username, password=password)
        
        logger.debug(f"Authenticated user: {user}")
        
        if user is not None:
            # Create JWT token
            payload = {
                'user_id': user.id,
                'username': user.username,
                'exp': datetime.utcnow() + timedelta(hours=24)  # Token expires in 24 hours
            }
            
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            
            # Create httponly cookie
            response = Response({'message': 'Login successful', 'username': user.username})
            # Determine cookie settings based on environment
            is_production = not settings.DEBUG
            
            response.set_cookie(
                key='jwt',
                value=token,
                httponly=True,
                secure=is_production,      # True in production
                samesite='None' if is_production else 'Lax',  # None needed for cross-site
                max_age=86400              # 24 hours
            )
            
            logger.info(f"User {username} logged in successfully")
            return response
        else:
            logger.warning(f"Failed login attempt for username: {username}")
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    def post(self, request):
        response = Response({'message': 'Logout successful'})
        is_production = not settings.DEBUG
        response.delete_cookie(
            'jwt',
            samesite='None' if is_production else 'Lax'
        )
        return response

@method_decorator(csrf_exempt, name='dispatch')
class CheckAuthView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        token = request.COOKIES.get('jwt')
        
        if not token:
            return Response({'isAuthenticated': False}, status=status.HTTP_200_OK)
        
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            return Response({
                'isAuthenticated': True,
                'username': payload['username']
            }, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError:
            return Response({'isAuthenticated': False}, status=status.HTTP_200_OK)
        except jwt.InvalidTokenError:
            return Response({'isAuthenticated': False}, status=status.HTTP_200_OK)
