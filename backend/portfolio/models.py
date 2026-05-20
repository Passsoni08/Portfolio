from django.db import models


def _en(value):
    if isinstance(value, dict):
        return value.get('en', '') or value.get('pt-BR', '') or ''
    return value or ''


class Profile(models.Model):
    name = models.CharField(max_length=100)
    job_title = models.JSONField(default=dict)
    bio = models.JSONField(blank=True, default=dict)
    photo = models.ImageField(upload_to='profile/', blank=True)
    whatsapp_url = models.URLField(max_length=200, blank=True)
    email = models.EmailField()
    location = models.CharField(max_length=200)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    resume_file = models.FileField(upload_to='resume/', blank=True)

    class Meta:
        verbose_name_plural = 'Profile'

    def __str__(self):
        return self.name


class SkillCategory(models.Model):
    CATEGORY_CHOICES = [('hard', 'Hard Skill'), ('soft', 'Soft Skill')]
    name = models.JSONField(default=dict)
    category_type = models.CharField(max_length=4, choices=CATEGORY_CHOICES)
    order = models.IntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Skill Categories'

    def __str__(self):
        return _en(self.name)


class Skill(models.Model):
    name = models.JSONField(default=dict)
    icon = models.FileField(upload_to='skills/', blank=True)
    icon_url = models.URLField(blank=True)
    proficiency = models.IntegerField(default=80)
    category = models.ForeignKey(
        SkillCategory, on_delete=models.CASCADE, related_name='skills'
    )
    order = models.IntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return _en(self.name)


class Project(models.Model):
    title = models.JSONField(default=dict)
    slug = models.SlugField(unique=True)
    description = models.JSONField(default=dict)
    short_description = models.JSONField(default=dict)
    thumbnail = models.ImageField(upload_to='projects/', blank=True)
    thumbnail_url = models.CharField(max_length=500, blank=True)
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    technologies = models.ManyToManyField(Skill, blank=True, related_name='projects')
    featured = models.BooleanField(default=False, db_index=True)
    order = models.IntegerField(default=0, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return _en(self.title)


class Experience(models.Model):
    title = models.JSONField(default=dict)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200, blank=True)
    description = models.JSONField(default=dict)
    start_date = models.DateField(db_index=True)
    end_date = models.DateField(null=True, blank=True)
    order = models.IntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['order', '-start_date']

    def __str__(self):
        return f'{_en(self.title)} at {self.company}'


class Education(models.Model):
    institution = models.CharField(max_length=200)
    degree = models.JSONField(default=dict)
    field_of_study = models.JSONField(blank=True, default=dict)
    start_date = models.DateField(db_index=True)
    end_date = models.DateField(null=True, blank=True)
    description = models.JSONField(blank=True, default=dict)
    order = models.IntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['order', '-start_date']
        verbose_name_plural = 'Education'

    def __str__(self):
        return f'{_en(self.degree)} - {self.institution}'


class Language(models.Model):
    LEVEL_CHOICES = [
        ('native', 'Native'),
        ('fluent', 'Fluent'),
        ('advanced', 'Advanced'),
        ('intermediate', 'Intermediate'),
        ('basic', 'Basic'),
    ]
    name = models.CharField(max_length=50)
    level = models.CharField(max_length=15, choices=LEVEL_CHOICES)
    order = models.IntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    is_read = models.BooleanField(default=False, db_index=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} - {self.subject}'
