import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.utils.text import slugify

from portfolio.models import (
    Experience,
    Language,
    Profile,
    Project,
    Skill,
    SkillCategory,
)


class Command(BaseCommand):
    help = 'Seed database from data/profile.json'

    def handle(self, *args, **options):
        json_path = Path(__file__).resolve().parent.parent.parent.parent.parent / 'data' / 'profile.json'

        if not json_path.exists():
            self.stderr.write(self.style.ERROR(f'File not found: {json_path}'))
            return

        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Profile
        profile, created = Profile.objects.update_or_create(
            email=data['email'],
            defaults={
                'name': data['name'],
                'job_title': data['job'],
                'phone': data.get('phone', ''),
                'location': data.get('location', ''),
                'github_url': 'https://github.com/Passsoni08',
            },
        )
        action = 'Created' if created else 'Updated'
        self.stdout.write(self.style.SUCCESS(f'{action} profile: {profile.name}'))

        # Hard Skills
        hard_cat, _ = SkillCategory.objects.get_or_create(
            name='Hard Skills',
            defaults={'category_type': 'hard', 'order': 0},
        )
        for i, skill_data in enumerate(data.get('skills', {}).get('hardSkills', [])):
            Skill.objects.update_or_create(
                name=skill_data['name'],
                category=hard_cat,
                defaults={'order': i},
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(data["skills"]["hardSkills"])} hard skills'))

        # Soft Skills
        soft_cat, _ = SkillCategory.objects.get_or_create(
            name='Soft Skills',
            defaults={'category_type': 'soft', 'order': 1},
        )
        for i, skill_name in enumerate(data.get('skills', {}).get('softSkills', [])):
            Skill.objects.update_or_create(
                name=skill_name,
                category=soft_cat,
                defaults={'order': i},
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(data["skills"]["softSkills"])} soft skills'))

        # Languages
        level_map = {
            'Portuguese': 'native',
            'English': 'advanced',
            'Spanish': 'intermediate',
        }
        for i, lang_name in enumerate(data.get('languages', [])):
            Language.objects.update_or_create(
                name=lang_name,
                defaults={'level': level_map.get(lang_name, 'intermediate'), 'order': i},
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(data["languages"])} languages'))

        # Projects
        for i, proj in enumerate(data.get('portfolio', [])):
            Project.objects.update_or_create(
                slug=slugify(proj['name']),
                defaults={
                    'title': proj['name'],
                    'description': proj['name'],
                    'short_description': proj['name'],
                    'github_url': proj.get('url', ''),
                    'order': i,
                },
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(data["portfolio"])} projects'))

        # Experience
        for i, exp in enumerate(data.get('professionalExperience', [])):
            period = exp.get('period', '').split('-')
            start_parts = period[0].strip().split('/') if period else ['01', '2024']
            end_parts = period[1].strip().split('/') if len(period) > 1 else None

            start_date = f'{start_parts[1]}-{start_parts[0]}-01'
            end_date = f'{end_parts[1]}-{end_parts[0]}-01' if end_parts else None

            Experience.objects.update_or_create(
                title=exp['name'],
                defaults={
                    'company': 'Intercolegial',
                    'description': exp.get('description', ''),
                    'start_date': start_date,
                    'end_date': end_date,
                    'order': i,
                },
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(data["professionalExperience"])} experiences'))

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
