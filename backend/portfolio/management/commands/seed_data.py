import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.utils.text import slugify

from portfolio.models import (
    Education,
    Experience,
    Language,
    Profile,
    Project,
    Skill,
    SkillCategory,
)


def _en(value):
    if isinstance(value, dict):
        return value.get('en', '') or value.get('pt-BR', '') or ''
    return value or ''


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
                'bio': data.get('bio', {}),
                'phone': data.get('phone', ''),
                'location': data.get('location', ''),
                'github_url': data.get('github_url', ''),
                'linkedin_url': data.get('linkedin_url', ''),
            },
        )
        action = 'Created' if created else 'Updated'
        self.stdout.write(self.style.SUCCESS(f'{action} profile: {profile.name}'))

        # Clear old hard skill categories and skills
        Skill.objects.filter(category__category_type='hard').delete()
        SkillCategory.objects.filter(category_type='hard').delete()

        # Hard Skills — 4 categories with translatable names
        skills_data = data.get('skills', {})
        hard_categories = [
            ({'en': 'Backend', 'pt-BR': 'Backend'}, 'backend', 0),
            ({'en': 'Frontend', 'pt-BR': 'Frontend'}, 'frontend', 1),
            ({'en': 'Infrastructure', 'pt-BR': 'Infraestrutura'}, 'infrastructure', 2),
            ({'en': 'AI Tools', 'pt-BR': 'Ferramentas IA'}, 'aiTools', 3),
        ]

        total_hard = 0
        for cat_name, json_key, order in hard_categories:
            cat_skills = skills_data.get(json_key, [])
            if not cat_skills:
                continue

            category = SkillCategory.objects.create(
                name=cat_name,
                category_type='hard',
                order=order,
            )

            for i, skill in enumerate(cat_skills):
                Skill.objects.create(
                    name=skill['name'],
                    category=category,
                    proficiency=skill.get('proficiency', 70),
                    icon_url=skill.get('icon', '') or '',
                    order=i,
                )
                total_hard += 1

        self.stdout.write(self.style.SUCCESS(f'Seeded {total_hard} hard skills in 4 categories'))

        # Soft Skills — clear all and recreate (avoids JSONField lookup duplicates)
        SkillCategory.objects.filter(category_type='soft').delete()
        soft_cat = SkillCategory.objects.create(
            name={'en': 'Soft Skills', 'pt-BR': 'Soft Skills'},
            category_type='soft',
            order=4,
        )
        for i, skill_name in enumerate(skills_data.get('softSkills', [])):
            Skill.objects.create(
                name=skill_name,
                category=soft_cat,
                order=i,
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(skills_data.get("softSkills", []))} soft skills'))

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

        # Projects — clear all and recreate (slug derived from English title)
        Project.objects.all().delete()
        for i, proj in enumerate(data.get('portfolio', [])):
            Project.objects.create(
                slug=slugify(_en(proj['name'])),
                title=proj['name'],
                description=proj.get('description', proj['name']),
                short_description=proj.get('short_description', proj['name']),
                thumbnail_url=proj.get('thumbnail_url', ''),
                github_url=proj.get('url', ''),
                order=i,
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(data["portfolio"])} projects'))

        # Experience — clear all and recreate
        Experience.objects.all().delete()
        for i, exp in enumerate(data.get('professionalExperience', [])):
            period = exp.get('period', '').split('-')
            start_parts = period[0].strip().split('/') if period else ['01', '2024']
            end_raw = period[1].strip() if len(period) > 1 else None
            end_parts = end_raw.split('/') if end_raw and end_raw.lower() != 'present' else None

            start_date = f'{start_parts[1]}-{start_parts[0]}-01'
            end_date = f'{end_parts[1]}-{end_parts[0]}-01' if end_parts and len(end_parts) == 2 else None

            Experience.objects.create(
                title=exp['name'],
                company=exp.get('company', ''),
                description=exp.get('description', ''),
                start_date=start_date,
                end_date=end_date,
                order=i,
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(data["professionalExperience"])} experiences'))

        # Education — clear all and recreate
        Education.objects.all().delete()
        for i, edu in enumerate(data.get('education', [])):
            period = edu.get('period', '').split('-')
            start_parts = period[0].strip().split('/') if period else ['01', '2024']
            end_raw = period[1].strip() if len(period) > 1 else None
            end_parts = end_raw.split('/') if end_raw and end_raw.lower() != 'present' else None

            start_date = f'{start_parts[1]}-{start_parts[0]}-01'
            end_date = f'{end_parts[1]}-{end_parts[0]}-01' if end_parts and len(end_parts) == 2 else None

            Education.objects.create(
                institution=edu.get('institution', ''),
                degree=edu.get('degree', ''),
                field_of_study=edu.get('field_of_study', ''),
                description=edu.get('description', ''),
                start_date=start_date,
                end_date=end_date,
                order=i,
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(data.get("education", []))} education entries'))

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
