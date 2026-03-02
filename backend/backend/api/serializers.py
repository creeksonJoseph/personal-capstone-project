from rest_framework import serializers
from .models import Post, Category, Tag, GalleryImage, PostImage
import json


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model"""
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "created_at", "updated_at"]
        read_only_fields = ["slug", "created_at", "updated_at"]


class TagSerializer(serializers.ModelSerializer):
    """Serializer for Tag model"""
    class Meta:
        model = Tag
        fields = ["id", "name", "slug", "created_at", "updated_at"]
        read_only_fields = ["slug", "created_at", "updated_at"]


class GalleryImageSerializer(serializers.ModelSerializer):
    """Serializer for GalleryImage model (standalone gallery only)"""
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = GalleryImage
        fields = ["id", "image", "image_url", "alt_text", "caption", "is_active", "created_at", "updated_at"]
        read_only_fields = ["image_url", "created_at", "updated_at"]

    def get_image_url(self, obj):
        """Get URL of the image (now a URLField with Cloudinary URL)"""
        # Since image is now a URLField, it's already a URL string
        return obj.image if obj.image else None


class PostImageSerializer(serializers.ModelSerializer):
    """Serializer for PostImage model (blog post images only)"""
    class Meta:
        model = PostImage
        fields = ["id", "image", "alt_text", "caption", "order", "created_at", "updated_at"]
        read_only_fields = ["created_at", "updated_at"]


class CustomJSONField(serializers.Field):
    def to_internal_value(self, data):
        if isinstance(data, list):
            data = data[0]
        if isinstance(data, str):
            if data == "":
                raise serializers.ValidationError('Content cannot be empty')
            try:
                return json.loads(data)
            except json.JSONDecodeError as e:
                raise serializers.ValidationError(f'Invalid JSON format: {e}')
        elif isinstance(data, (dict, list)):
            return data
        else:
            raise serializers.ValidationError(f'Unexpected content type: {type(data)}')
    
    def to_representation(self, value):
        return value


class PostSerializer(serializers.ModelSerializer):
    """Serializer for Post model"""
    content = CustomJSONField()
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
        queryset=Category.objects.all(),
        source="categories"
    )
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
        queryset=Tag.objects.all(),
        source="tags",
        required=False
    )
    post_images = PostImageSerializer(many=True, read_only=True)
    post_image_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
        queryset=PostImage.objects.all(),
        source="post_images",
        required=False
    )
    featured_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id", "title", "slug", "description", "content", "content_html",
            "featured_image", "featured_image_url", "featured_image_alt",
            "video_url", "categories", "category_ids", "tags", "tag_ids",
            "post_images", "post_image_ids", "author", "status",
            "published_at", "created_at", "updated_at"
        ]
        read_only_fields = ["slug", "featured_image_url", "created_at", "updated_at"]


    def get_featured_image_url(self, obj):
        """Get URL of the featured image (now a URLField with Cloudinary URL)"""
        # Since featured_image is now a URLField, it's already a URL string
        return obj.featured_image if obj.featured_image else None

    def create(self, validated_data):
        """Custom create method to handle many-to-many relationships"""
        categories = validated_data.pop('categories', [])
        tags = validated_data.pop('tags', [])
        post_images = validated_data.pop('post_images', [])
        
        post = Post.objects.create(**validated_data)
        
        if categories:
            post.categories.set(categories)
        if tags:
            post.tags.set(tags)
        if post_images:
            post.post_images.set(post_images)
            
        return post

    def update(self, instance, validated_data):
        """Custom update method to handle many-to-many relationships"""
        # Extract many-to-many fields
        categories = validated_data.pop('categories', None)
        tags = validated_data.pop('tags', None)
        post_images = validated_data.pop('post_images', None)
        
        # Update regular fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update many-to-many relationships
        if categories is not None:
            instance.categories.set(categories)
        if tags is not None:
            instance.tags.set(tags)
        if post_images is not None:
            instance.post_images.set(post_images)
            
        return instance
