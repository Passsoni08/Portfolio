import factory
from django.utils.text import slugify

from portfolio.models import (
    ContactMessage,
    Education,
    Experience,
    Language,
    Profile,
    Project,
    Skill,
    SkillCategory,
)


class ProfileFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Profile

    name = factory.Faker('name')
    job_title = 'Software Developer'
    bio = factory.Faker('paragraph')
    phone = '+55 (16) 99999-9999'
    email = factory.Faker('email')
    location = 'São Paulo, Brasil'
    github_url = 'https://github.com/testuser'
    linkedin_url = 'https://linkedin.com/in/testuser'


class SkillCategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = SkillCategory

    name = factory.Sequence(lambda n: f'Category {n}')
    category_type = 'hard'
    order = factory.Sequence(lambda n: n)


class SkillFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Skill

    name = factory.Sequence(lambda n: f'Skill {n}')
    proficiency = 80
    category = factory.SubFactory(SkillCategoryFactory)
    order = factory.Sequence(lambda n: n)


class ProjectFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Project

    title = factory.Sequence(lambda n: f'Project {n}')
    slug = factory.LazyAttribute(lambda o: slugify(o.title))
    description = factory.Faker('paragraph')
    short_description = factory.Faker('sentence')
    github_url = 'https://github.com/testuser/project'
    featured = False
    order = factory.Sequence(lambda n: n)

    @factory.post_generation
    def technologies(self, create, extracted, **kwargs):
        if not create or not extracted:
            return
        self.technologies.add(*extracted)


class ExperienceFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Experience

    title = 'Software Developer'
    company = 'Test Company'
    location = 'Remote'
    description = factory.Faker('paragraph')
    start_date = '2024-01-01'
    end_date = '2025-01-01'
    order = factory.Sequence(lambda n: n)


class EducationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Education

    institution = 'Test University'
    degree = 'Computer Science'
    field_of_study = 'Software Engineering'
    start_date = '2020-01-01'
    end_date = '2024-01-01'
    order = factory.Sequence(lambda n: n)


class LanguageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Language

    name = factory.Sequence(lambda n: f'Language {n}')
    level = 'fluent'
    order = factory.Sequence(lambda n: n)


class ContactMessageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ContactMessage

    name = factory.Faker('name')
    email = factory.Faker('email')
    subject = 'Test Subject'
    message = factory.Faker('paragraph')
