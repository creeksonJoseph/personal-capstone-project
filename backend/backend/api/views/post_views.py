from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models import Post, Category, GalleryImage, PostImage
from ..serializers import PostSerializer, CategorySerializer, GalleryImageSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing blog posts
    """
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

    def get_permissions(self):
        """
        Return different permission classes for different actions
        - Allow public read access to published posts endpoint
        - Allow public read access to retrieve single posts (for blog detail page)
        - Require authentication for listing all posts (admin only)
        - Require authentication for all other actions
        """
        if self.action in ['published', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        """
        Create a new post with support for Cloudinary URLs
        """
        # Handle post image URLs - create PostImage objects
        if hasattr(request.data, 'getlist'):
            post_image_urls = request.data.getlist('post_image_urls')
        else:
            post_image_urls = request.data.get('post_image_urls', [])
        post_image_ids = []
        
        if post_image_urls:
            for url in post_image_urls:
                if url:  # Skip empty URLs
                    post_img = PostImage.objects.create(
                        image=url,
                        alt_text="Post image",
                        order=0
                    )
                    post_image_ids.append(post_img.id)
        
        # Create a mutable copy of request.data
        data = request.data.copy()
        
        # Add post_image_ids to the data
        if post_image_ids:
            if hasattr(data, 'setlist'):
                data.setlist('post_image_ids', post_image_ids)
            else:
                data['post_image_ids'] = post_image_ids
        
        serializer = self.get_serializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """
        Update an existing post with support for Cloudinary URLs
        """
        instance = self.get_object()
        
        # Handle post image URLs - create PostImage objects
        if hasattr(request.data, 'getlist'):
            post_image_urls = request.data.getlist('post_image_urls')
        else:
            post_image_urls = request.data.get('post_image_urls', [])
        post_image_ids = []
        
        if post_image_urls:
            for url in post_image_urls:
                if url:  # Skip empty URLs
                    post_img = PostImage.objects.create(
                        image=url,
                        alt_text="Post image",
                        order=0
                    )
                    post_image_ids.append(post_img.id)
        
        # Create a mutable copy of request.data
        data = request.data.copy()
        
        # Add post_image_ids to the data
        if post_image_ids:
            if hasattr(data, 'setlist'):
                data.setlist('post_image_ids', post_image_ids)
            else:
                data['post_image_ids'] = post_image_ids
        
        serializer = self.get_serializer(instance, data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """
        Delete a post
        """
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'])
    def published(self, request):
        """
        Get all published posts
        """
        posts = Post.objects.filter(status='published').order_by('-published_at')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def drafts(self, request):
        """
        Get all draft posts
        """
        posts = Post.objects.filter(status='draft').order_by('-created_at')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def archived(self, request):
        """
        Get all archived posts
        """
        posts = Post.objects.filter(status='archived').order_by('-created_at')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        """
        Publish a draft or archived post
        """
        from django.utils import timezone
        post = self.get_object()
        post.status = 'published'
        if not post.published_at:
            post.published_at = timezone.now()
        post.save()
        serializer = self.get_serializer(post)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        """
        Archive a published post
        """
        post = self.get_object()
        post.status = 'archived'
        post.save()
        serializer = self.get_serializer(post)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def unpublish(self, request, pk=None):
        """
        Unpublish a published post (change to draft)
        """
        post = self.get_object()
        post.status = 'draft'
        post.save()
        serializer = self.get_serializer(post)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing categories
    """
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class GalleryImageViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing gallery images
    """
    queryset = GalleryImage.objects.all().order_by('-created_at')
    serializer_class = GalleryImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
