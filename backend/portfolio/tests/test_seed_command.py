import json
from pathlib import Path

import pytest
from django.core.management import call_command

from portfolio.models import (
    Education,
    Experience,
    Language,
    Profile,
    Project,
    Skill,
    SkillCategory,
)

PROFILE_JSON = (
    Path(__file__).resolve().parent.parent.parent.parent / 'data' / 'profile.json'
)


@pytest.fixture(scope='module')
def profile_data():
    with open(PROFILE_JSON, 'r', encoding='utf-8') as f:
        return json.load(f)


@pytest.fixture
def expected_counts(profile_data):
    skills = profile_data.get('skills', {})
    hard_keys = ['backend', 'frontend', 'infrastructure', 'aiTools']
    hard_categories = sum(1 for k in hard_keys if skills.get(k))
    hard_skills = sum(len(skills.get(k, [])) for k in hard_keys)
    soft_skills = len(skills.get('softSkills', []))

    return {
        'categories': hard_categories + 1,
        'skills': hard_skills + soft_skills,
        'languages': len(profile_data.get('languages', [])),
        'projects': len(profile_data.get('portfolio', [])),
        'experiences': len(profile_data.get('professionalExperience', [])),
        'education': len(profile_data.get('education', [])),
    }


@pytest.mark.django_db
class TestSeedCommand:
    def test_creates_profile(self, profile_data):
        call_command('seed_data')
        assert Profile.objects.count() == 1
        profile = Profile.objects.first()
        assert profile.name == profile_data['name']
        assert profile.job_title == profile_data['job']
        assert profile.email == profile_data['email']

    def test_creates_skill_categories(self, expected_counts):
        call_command('seed_data')
        assert SkillCategory.objects.count() == expected_counts['categories']
        assert SkillCategory.objects.filter(category_type='hard').exists()
        assert SkillCategory.objects.filter(category_type='soft').exists()

    def test_creates_skills(self, expected_counts):
        call_command('seed_data')
        assert Skill.objects.count() == expected_counts['skills']

    def test_creates_languages(self, expected_counts):
        call_command('seed_data')
        assert Language.objects.count() == expected_counts['languages']

    def test_creates_projects(self, expected_counts):
        call_command('seed_data')
        assert Project.objects.count() == expected_counts['projects']

    def test_creates_experiences(self, expected_counts):
        call_command('seed_data')
        assert Experience.objects.count() == expected_counts['experiences']

    def test_creates_education(self, expected_counts):
        call_command('seed_data')
        assert Education.objects.count() == expected_counts['education']

    def test_idempotent(self, expected_counts):
        call_command('seed_data')
        call_command('seed_data')
        assert Profile.objects.count() == 1
        assert SkillCategory.objects.count() == expected_counts['categories']
        assert Skill.objects.count() == expected_counts['skills']
        assert Project.objects.count() == expected_counts['projects']
        assert Experience.objects.count() == expected_counts['experiences']
