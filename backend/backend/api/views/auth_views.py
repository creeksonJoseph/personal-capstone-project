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
from decouple import config

# True only when HTTPS_ENABLED env var is explicitly set to True.
# On the HTTP-only Azure VM this must be False, otherwise browsers
# silently drop the cookie (Secure cookies are blocked over HTTP).
HTTPS_ENABLED = config('HTTPS_ENABLED', default=False, cast=bool)

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
            
            response = Response({'message': 'Login successful', 'username': user.username})
            response.set_cookie(
                key='jwt',
                value=token,
                httponly=True,
                secure=HTTPS_ENABLED,                          # False on HTTP VM — allows browser to store the cookie
                samesite='None' if HTTPS_ENABLED else 'Lax',  # Lax works fine for same-site HTTP requests
                max_age=86400                                  # 24 hours
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
        response.delete_cookie(
            'jwt',
            samesite='None' if HTTPS_ENABLED else 'Lax'  # Must match how the cookie was set
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
