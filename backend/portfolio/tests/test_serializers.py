import pytest

from portfolio.serializers import (
    ContactMessageSerializer,
    ProfileSerializer,
    ProjectSerializer,
    SkillCategorySerializer,
)

from .factories import (
    ProfileFactory,
    ProjectFactory,
    SkillCategoryFactory,
    SkillFactory,
)


@pytest.mark.django_db
class TestProfileSerializer:
    def test_contains_expected_fields(self):
        profile = ProfileFactory()
        data = ProfileSerializer(profile).data
        expected = {'id', 'name', 'job_title', 'bio', 'photo', 'phone',
                    'email', 'location', 'github_url', 'linkedin_url', 'resume_file'}
        assert set(data.keys()) == expected


@pytest.mark.django_db
class TestSkillCategorySerializer:
    def test_includes_nested_skills(self):
        cat = SkillCategoryFactory()
        SkillFactory(category=cat, name='Python')
        SkillFactory(category=cat, name='Django')
        data = SkillCategorySerializer(cat).data
        assert 'skills' in data
        assert len(data['skills']) == 2
        assert data['skills'][0]['name'] in ('Python', 'Django')


@pytest.mark.django_db
class TestProjectSerializer:
    def test_includes_technologies(self):
        skill = SkillFactory(name='React')
        project = ProjectFactory(technologies=[skill])
        data = ProjectSerializer(project).data
        assert 'technologies' in data
        assert len(data['technologies']) == 1
        assert data['technologies'][0]['name'] == 'React'


@pytest.mark.django_db
class TestContactMessageSerializer:
    def test_valid_data(self):
        data = {
            'name': 'John',
            'email': 'john@example.com',
            'subject': 'Hello',
            'message': 'Test message',
        }
        serializer = ContactMessageSerializer(data=data)
        assert serializer.is_valid()

    def test_invalid_email(self):
        data = {
            'name': 'John',
            'email': 'not-an-email',
            'subject': 'Hello',
            'message': 'Test',
        }
        serializer = ContactMessageSerializer(data=data)
        assert not serializer.is_valid()
        assert 'email' in serializer.errors

    def test_missing_required_field(self):
        data = {'name': 'John'}
        serializer = ContactMessageSerializer(data=data)
        assert not serializer.is_valid()
