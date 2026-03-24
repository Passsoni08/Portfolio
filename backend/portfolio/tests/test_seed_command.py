import pytest
from django.core.management import call_command

from portfolio.models import (
    Experience,
    Language,
    Profile,
    Project,
    Skill,
    SkillCategory,
)


@pytest.mark.django_db
class TestSeedCommand:
    def test_creates_profile(self):
        call_command('seed_data')
        assert Profile.objects.count() == 1
        profile = Profile.objects.first()
        assert profile.name == 'Rafael V Passoni'
        assert profile.job_title == 'Software Developer'

    def test_creates_skill_categories(self):
        call_command('seed_data')
        assert SkillCategory.objects.count() == 2
        assert SkillCategory.objects.filter(category_type='hard').exists()
        assert SkillCategory.objects.filter(category_type='soft').exists()

    def test_creates_skills(self):
        call_command('seed_data')
        assert Skill.objects.count() == 10  # 5 hard + 5 soft

    def test_creates_languages(self):
        call_command('seed_data')
        assert Language.objects.count() == 3

    def test_creates_projects(self):
        call_command('seed_data')
        assert Project.objects.count() == 4

    def test_creates_experiences(self):
        call_command('seed_data')
        assert Experience.objects.count() == 1

    def test_idempotent(self):
        call_command('seed_data')
        call_command('seed_data')
        assert Profile.objects.count() == 1
        assert Project.objects.count() == 4
        assert Skill.objects.count() == 10
