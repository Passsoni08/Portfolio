import pytest

from portfolio.models import ContactMessage, Skill, SkillCategory

from .factories import (
    ContactMessageFactory,
    EducationFactory,
    ExperienceFactory,
    LanguageFactory,
    ProfileFactory,
    ProjectFactory,
    SkillCategoryFactory,
    SkillFactory,
)


@pytest.mark.django_db
class TestProfile:
    def test_create(self):
        profile = ProfileFactory()
        assert profile.pk is not None

    def test_str(self):
        profile = ProfileFactory(name='Rafael Passoni')
        assert str(profile) == 'Rafael Passoni'


@pytest.mark.django_db
class TestSkillCategory:
    def test_create(self):
        cat = SkillCategoryFactory()
        assert cat.pk is not None

    def test_str(self):
        cat = SkillCategoryFactory(name='Hard Skills')
        assert str(cat) == 'Hard Skills'

    def test_ordering(self):
        cat_b = SkillCategoryFactory(order=2)
        cat_a = SkillCategoryFactory(order=1)
        result = list(SkillCategory.objects.all())
        assert result[0] == cat_a
        assert result[1] == cat_b


@pytest.mark.django_db
class TestSkill:
    def test_create_with_category(self):
        cat = SkillCategoryFactory()
        skill = SkillFactory(category=cat)
        assert skill.category == cat

    def test_str(self):
        skill = SkillFactory(name='Python')
        assert str(skill) == 'Python'

    def test_ordering(self):
        cat = SkillCategoryFactory()
        s_b = SkillFactory(category=cat, order=2)
        s_a = SkillFactory(category=cat, order=1)
        result = list(Skill.objects.filter(category=cat))
        assert result[0] == s_a
        assert result[1] == s_b


@pytest.mark.django_db
class TestProject:
    def test_create(self):
        project = ProjectFactory()
        assert project.pk is not None

    def test_str(self):
        project = ProjectFactory(title='My Project')
        assert str(project) == 'My Project'

    def test_m2m_technologies(self):
        skill = SkillFactory()
        project = ProjectFactory(technologies=[skill])
        assert skill in project.technologies.all()


@pytest.mark.django_db
class TestExperience:
    def test_create(self):
        exp = ExperienceFactory()
        assert exp.pk is not None

    def test_str(self):
        exp = ExperienceFactory(title='Dev', company='ACME')
        assert str(exp) == 'Dev at ACME'


@pytest.mark.django_db
class TestEducation:
    def test_create(self):
        edu = EducationFactory()
        assert edu.pk is not None

    def test_str(self):
        edu = EducationFactory(degree='CS', institution='MIT')
        assert str(edu) == 'CS - MIT'


@pytest.mark.django_db
class TestLanguage:
    def test_create(self):
        lang = LanguageFactory()
        assert lang.pk is not None

    def test_str(self):
        lang = LanguageFactory(name='Portuguese')
        assert str(lang) == 'Portuguese'


@pytest.mark.django_db
class TestContactMessage:
    def test_create(self):
        msg = ContactMessageFactory()
        assert msg.pk is not None

    def test_is_read_default_false(self):
        msg = ContactMessageFactory()
        assert msg.is_read is False

    def test_str(self):
        msg = ContactMessageFactory(name='John', subject='Hello')
        assert str(msg) == 'John - Hello'

    def test_ordering(self):
        msg_old = ContactMessageFactory()
        msg_new = ContactMessageFactory()
        result = list(ContactMessage.objects.all())
        assert result[0] == msg_new
        assert result[1] == msg_old
