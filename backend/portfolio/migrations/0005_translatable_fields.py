"""Convert translatable text fields to JSONField with {en, pt-BR} shape.

For each translatable field, existing values are wrapped as
``{"en": <existing>, "pt-BR": ""}`` so the schema change is non-destructive.
Frontend ``localize()`` helper falls back to ``en`` when ``pt-BR`` is empty.
"""
import json

from django.db import migrations, models


TRANSLATABLE_FIELDS = [
    ('Profile', ['job_title', 'bio']),
    ('SkillCategory', ['name']),
    ('Skill', ['name']),
    ('Project', ['title', 'short_description', 'description']),
    ('Experience', ['title', 'description']),
    ('Education', ['degree', 'field_of_study', 'description']),
]


def wrap_strings(apps, schema_editor):
    """Encode each plain string as JSON so the column type change can succeed."""
    for model_name, fields in TRANSLATABLE_FIELDS:
        Model = apps.get_model('portfolio', model_name)
        for obj in Model.objects.all():
            changed = False
            for field in fields:
                value = getattr(obj, field, None)
                if isinstance(value, str) and not value.startswith('{'):
                    payload = {'en': value, 'pt-BR': ''}
                    setattr(obj, field, json.dumps(payload, ensure_ascii=False))
                    changed = True
            if changed:
                obj.save()


def unwrap_strings(apps, schema_editor):
    """Reverse: extract ``en`` value back to plain string."""
    for model_name, fields in TRANSLATABLE_FIELDS:
        Model = apps.get_model('portfolio', model_name)
        for obj in Model.objects.all():
            changed = False
            for field in fields:
                value = getattr(obj, field, None)
                if isinstance(value, dict):
                    setattr(obj, field, value.get('en', ''))
                    changed = True
                elif isinstance(value, str) and value.startswith('{'):
                    try:
                        data = json.loads(value)
                        setattr(obj, field, data.get('en', '') if isinstance(data, dict) else value)
                        changed = True
                    except json.JSONDecodeError:
                        pass
            if changed:
                obj.save()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0004_alter_contactmessage_created_at_and_more'),
    ]

    operations = [
        migrations.RunPython(wrap_strings, unwrap_strings),
        migrations.AlterField(
            model_name='profile',
            name='job_title',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='profile',
            name='bio',
            field=models.JSONField(blank=True, default=dict),
        ),
        migrations.AlterField(
            model_name='skillcategory',
            name='name',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='skill',
            name='name',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='project',
            name='title',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='project',
            name='short_description',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='project',
            name='description',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='experience',
            name='title',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='experience',
            name='description',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='education',
            name='degree',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='education',
            name='field_of_study',
            field=models.JSONField(blank=True, default=dict),
        ),
        migrations.AlterField(
            model_name='education',
            name='description',
            field=models.JSONField(blank=True, default=dict),
        ),
    ]
