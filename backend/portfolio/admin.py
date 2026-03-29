from django.contrib import admin
from django.http import HttpRequest

from .models import (
    ContactMessage,
    Education,
    Experience,
    Language,
    Profile,
    Project,
    Skill,
    SkillCategory,
)

# ── Admin site branding ──────────────────────────────────
admin.site.site_header = 'Portfolio Admin'
admin.site.site_title = 'Portfolio'
admin.site.index_title = 'Content Management'


# ── Inlines ───────────────────────────────────────────────
class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1
    fields = ['name', 'icon_url', 'icon', 'proficiency', 'order']


# ── Profile (singleton) ──────────────────────────────────
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'job_title', 'email', 'location']
    fieldsets = [
        (None, {'fields': ['name', 'job_title', 'bio', 'photo']}),
        ('Contact', {'fields': ['email', 'phone', 'location']}),
        ('Links', {'fields': ['github_url', 'linkedin_url', 'resume_file']}),
    ]

    def has_add_permission(self, request: HttpRequest) -> bool:
        return not Profile.objects.exists()


# ── Skills ────────────────────────────────────────────────
@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category_type', 'skill_count', 'order']
    list_editable = ['order']
    list_filter = ['category_type']
    inlines = [SkillInline]

    @admin.display(description='Skills')
    def skill_count(self, obj: SkillCategory) -> int:
        return obj.skills.count()


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'order']
    list_editable = ['order', 'proficiency']
    list_filter = ['category']
    search_fields = ['name']


# ── Projects ─────────────────────────────────────────────
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'featured', 'tech_list', 'order', 'created_at']
    list_editable = ['featured', 'order']
    list_filter = ['featured', 'technologies']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['technologies']
    fieldsets = [
        (None, {'fields': ['title', 'slug', 'short_description', 'description']}),
        ('Media', {'fields': ['thumbnail', 'thumbnail_url']}),
        ('Links', {'fields': ['live_url', 'github_url']}),
        ('Meta', {'fields': ['technologies', 'featured', 'order']}),
    ]

    @admin.display(description='Technologies')
    def tech_list(self, obj: Project) -> str:
        return ', '.join(t.name for t in obj.technologies.all()[:4])


# ── Experience ────────────────────────────────────────────
@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'date_range', 'order']
    list_editable = ['order']
    search_fields = ['title', 'company']

    @admin.display(description='Period')
    def date_range(self, obj: Experience) -> str:
        end = obj.end_date.strftime('%b %Y') if obj.end_date else 'Present'
        return f'{obj.start_date.strftime("%b %Y")} — {end}'


# ── Education ─────────────────────────────────────────────
@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'field_of_study', 'date_range', 'order']
    list_editable = ['order']
    search_fields = ['degree', 'institution']

    @admin.display(description='Period')
    def date_range(self, obj: Education) -> str:
        end = obj.end_date.strftime('%b %Y') if obj.end_date else 'Present'
        return f'{obj.start_date.strftime("%b %Y")} — {end}'


# ── Languages ─────────────────────────────────────────────
@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ['name', 'level', 'order']
    list_editable = ['order', 'level']


# ── Contact Messages ─────────────────────────────────────
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    date_hierarchy = 'created_at'
    actions = ['mark_as_read', 'mark_as_unread']

    @admin.action(description='Mark selected as read')
    def mark_as_read(self, request: HttpRequest, queryset):
        queryset.update(is_read=True)

    @admin.action(description='Mark selected as unread')
    def mark_as_unread(self, request: HttpRequest, queryset):
        queryset.update(is_read=False)

    def has_add_permission(self, request: HttpRequest) -> bool:
        return False
