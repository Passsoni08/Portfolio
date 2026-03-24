from unittest.mock import patch

import pytest
from rest_framework.test import APIClient

from .factories import (
    ExperienceFactory,
    LanguageFactory,
    ProfileFactory,
    ProjectFactory,
    SkillCategoryFactory,
    SkillFactory,
)


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def seeded_db():
    profile = ProfileFactory()
    cat = SkillCategoryFactory(name='Hard Skills', category_type='hard')
    SkillFactory(category=cat, name='Python')
    ProjectFactory(title='Test Project', slug='test-project')
    ExperienceFactory()
    LanguageFactory(name='Portuguese', level='native')
    return profile


@pytest.mark.django_db
class TestPortfolioDataView:
    def test_returns_200(self, api_client, seeded_db):
        response = api_client.get('/api/v1/portfolio/')
        assert response.status_code == 200

    def test_contains_all_keys(self, api_client, seeded_db):
        response = api_client.get('/api/v1/portfolio/')
        data = response.json()
        expected_keys = {'profile', 'skill_categories', 'projects',
                         'experience', 'education', 'languages'}
        assert set(data.keys()) == expected_keys

    def test_profile_data(self, api_client, seeded_db):
        response = api_client.get('/api/v1/portfolio/')
        assert response.json()['profile'] is not None
        assert response.json()['profile']['name'] == seeded_db.name


@pytest.mark.django_db
class TestProjectViews:
    def test_list_returns_200(self, api_client, seeded_db):
        response = api_client.get('/api/v1/projects/')
        assert response.status_code == 200
        assert len(response.json()) == 1

    def test_detail_valid_slug(self, api_client, seeded_db):
        response = api_client.get('/api/v1/projects/test-project/')
        assert response.status_code == 200
        assert response.json()['title'] == 'Test Project'

    def test_detail_invalid_slug(self, api_client, seeded_db):
        response = api_client.get('/api/v1/projects/nonexistent/')
        assert response.status_code == 404


@pytest.mark.django_db
@patch('portfolio.views.ContactRateThrottle.allow_request', return_value=True)
class TestContactView:
    def test_valid_submission(self, mock_throttle, api_client):
        data = {
            'name': 'John',
            'email': 'john@example.com',
            'subject': 'Hello',
            'message': 'Test message',
        }
        response = api_client.post('/api/v1/contact/', data, format='json')
        assert response.status_code == 201

    def test_invalid_submission(self, mock_throttle, api_client):
        data = {'name': 'John'}
        response = api_client.post('/api/v1/contact/', data, format='json')
        assert response.status_code == 400

    def test_invalid_email(self, mock_throttle, api_client):
        data = {
            'name': 'John',
            'email': 'bad-email',
            'subject': 'Hello',
            'message': 'Test',
        }
        response = api_client.post('/api/v1/contact/', data, format='json')
        assert response.status_code == 400
