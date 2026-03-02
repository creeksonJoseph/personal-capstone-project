from django.db import models
from django.utils.text import slugify
from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver
import cloudinary.uploader
import re
import logging

logger = logging.getLogger(__name__)


class Category(models.Model):
    """
    Model for post categories
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(
        max_length=100,
        unique=True,
        help_text="Unique URL friendly identifier"
    )
    description = models.TextField(
        blank=True,
        help_text="Brief description of the category"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class GalleryImage(models.Model):
    """
    Model for gallery images
    """
    image = models.URLField(
        max_length=500,
        help_text="Cloudinary image URL"
    )
    alt_text = models.CharField(
        max_length=200,
        help_text="Alternative text for accessibility"
    )
    caption = models.TextField(
        blank=True,
        help_text="Image caption"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Whether the image is visible in the gallery"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Gallery Images"
        ordering = ["-created_at"]

    def __str__(self):
        return self.alt_text


class PostImage(models.Model):
    """
    Model for images within blog posts (not standalone gallery)
    """
    image = models.URLField(
        max_length=500,
        help_text="Cloudinary image URL"
    )
    alt_text = models.CharField(
        max_length=200,
        blank=True,
        help_text="Alternative text for accessibility"
    )
    caption = models.TextField(
        blank=True,
        help_text="Image caption"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order within post"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Post Images"
        ordering = ["order", "-created_at"]

    def __str__(self):
        return f"Post Image: {self.alt_text or 'Untitled'}"


class Tag(models.Model):
    """
    Model for post tags
    """
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(
        unique=True,
        help_text="Unique URL friendly identifier"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Post(models.Model):
    """
    Model for blog posts
    """
    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("published", "Published"),
        ("archived", "Archived"),
    ]

    title = models.CharField(
        max_length=255,
        help_text="Post title"
    )
    slug = models.SlugField(
        max_length=255,
        unique=True,
        help_text="Unique URL friendly identifier"
    )
    description = models.TextField(
        blank=True,
        help_text="Short description for post cards"
    )
    content = models.JSONField(
        help_text="Rich content from Lexical editor in JSON format"
    )
    content_html = models.TextField(
        blank=True,
        help_text="HTML representation of content for display purposes"
    )
    featured_image = models.URLField(
        max_length=500,
        blank=True,
        help_text="Cloudinary featured image URL"
    )
    featured_image_alt = models.CharField(
        max_length=200,
        blank=True,
        help_text="Alternative text for featured image"
    )
    video_url = models.URLField(
        blank=True,
        help_text="Video URL if post has a video instead of image"
    )
    author = models.CharField(
        max_length=100,
        default="Admin",
        help_text="Author name"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="draft",
        help_text="Post publication status"
    )
    published_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Date and time when post was published"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Relationships
    categories = models.ManyToManyField(
        "Category",
        related_name="posts",
        help_text="Select categories for this post"
    )
    tags = models.ManyToManyField(
        "Tag",
        related_name="posts",
        blank=True,
        help_text="Select tags for this post"
    )
    post_images = models.ManyToManyField(
        "PostImage",
        related_name="posts",
        blank=True,
        help_text="Images to display within this post"
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Post.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


# ============================================================================
# Cloudinary Automatic Deletion Signal Handlers
# ============================================================================

def extract_public_id_from_url(url):
    """
    Extract the public_id from a Cloudinary URL.
    
    Example URL: https://res.cloudinary.com/dzgwtssxv/image/upload/v1234567890/blog-posts/featured/abc123.jpg
    Returns: blog-posts/featured/abc123
    """
    if not url:
        return None
    
    # Match pattern: /upload/v{version}/{public_id}.{format}
    # or /upload/{public_id}.{format}
    pattern = r'/upload/(?:v\d+/)?(.+)\.\w+$'
    match = re.search(pattern, url)
    
    if match:
        return match.group(1)
    
    return None


def delete_cloudinary_image(url):
    """
    Delete an image from Cloudinary using its URL.
    Returns True if successful, False otherwise.
    """
    if not url or not url.startswith('http'):
        return False
    
    public_id = extract_public_id_from_url(url)
    
    if not public_id:
        logger.warning(f"Could not extract public_id from URL: {url}")
        return False
    
    try:
        result = cloudinary.uploader.destroy(public_id)
        if result.get('result') == 'ok':
            logger.info(f"Successfully deleted Cloudinary image: {public_id}")
            return True
        else:
            logger.warning(f"Cloudinary deletion returned: {result} for {public_id}")
            return False
    except Exception as e:
        logger.error(f"Error deleting Cloudinary image {public_id}: {str(e)}")
        return False


@receiver(pre_delete, sender=GalleryImage)
def delete_gallery_image_from_cloudinary(sender, instance, **kwargs):
    """
    Automatically delete the Cloudinary image when a GalleryImage is deleted.
    """
    if instance.image:
        delete_cloudinary_image(instance.image)


@receiver(pre_delete, sender=PostImage)
def delete_post_image_from_cloudinary(sender, instance, **kwargs):
    """
    Automatically delete the Cloudinary image when a PostImage is deleted.
    """
    if instance.image:
        delete_cloudinary_image(instance.image)


@receiver(pre_delete, sender=Post)
def delete_post_featured_image_from_cloudinary(sender, instance, **kwargs):
    """
    Automatically delete the featured image from Cloudinary when a Post is deleted.
    """
    if instance.featured_image:
        delete_cloudinary_image(instance.featured_image)


@receiver(pre_save, sender=Post)
def delete_old_featured_image_on_update(sender, instance, **kwargs):
    """
    Delete the old featured image from Cloudinary when it's replaced with a new one.
    """
    if not instance.pk:
        # New instance, no old image to delete
        return
    
    try:
        old_instance = Post.objects.get(pk=instance.pk)
        old_image = old_instance.featured_image
        new_image = instance.featured_image
        
        # If the featured image has changed and the old one exists
        if old_image and old_image != new_image:
            delete_cloudinary_image(old_image)
    except Post.DoesNotExist:
        # Instance doesn't exist yet, nothing to delete
        pass
