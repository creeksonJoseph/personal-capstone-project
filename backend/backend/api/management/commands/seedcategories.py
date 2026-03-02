from django.core.management.base import BaseCommand
from api.models import Category


class Command(BaseCommand):
    help = 'Seeds the database with initial categories'

    def handle(self, *args, **kwargs):
        categories = [
            'Academic',
            'Sports',
            'Arts',
            'Facilities',
            'School Events'
        ]

        for category_name in categories:
            # Check if category already exists
            if not Category.objects.filter(name=category_name).exists():
                Category.objects.create(name=category_name)
                self.stdout.write(self.style.SUCCESS(f'Created category: {category_name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Category already exists: {category_name}'))

        self.stdout.write(self.style.SUCCESS('Category seeding completed successfully'))