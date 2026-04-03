from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_control, cache_page
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import (
    Education,
    Experience,
    Language,
    Profile,
    Project,
    SkillCategory,
)
from .serializers import (
    ContactMessageSerializer,
    EducationSerializer,
    ExperienceSerializer,
    LanguageSerializer,
    ProfileSerializer,
    ProjectSerializer,
    SkillCategorySerializer,
)


class PortfolioDataView(APIView):
    @method_decorator(cache_control(public=True, max_age=900))
    @method_decorator(cache_page(60 * 15))
    def get(self, request):
        profile = Profile.objects.first()
        return Response({
            'profile': ProfileSerializer(profile).data if profile else None,
            'skill_categories': SkillCategorySerializer(
                SkillCategory.objects.prefetch_related('skills').all(),
                many=True,
            ).data,
            'projects': ProjectSerializer(
                Project.objects.prefetch_related('technologies').all(),
                many=True,
            ).data,
            'experience': ExperienceSerializer(
                Experience.objects.all(), many=True
            ).data,
            'education': EducationSerializer(
                Education.objects.all(), many=True
            ).data,
            'languages': LanguageSerializer(
                Language.objects.all(), many=True
            ).data,
        })


@method_decorator(cache_control(public=True, max_age=900), name='dispatch')
@method_decorator(cache_page(60 * 15), name='dispatch')
class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.prefetch_related('technologies')
    serializer_class = ProjectSerializer
    pagination_class = None


@method_decorator(cache_control(public=True, max_age=900), name='dispatch')
@method_decorator(cache_page(60 * 15), name='dispatch')
class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.prefetch_related('technologies')
    serializer_class = ProjectSerializer
    lookup_field = 'slug'


class ContactRateThrottle(AnonRateThrottle):
    rate = '5/hour'


class ContactCreateView(generics.CreateAPIView):
    serializer_class = ContactMessageSerializer
    throttle_classes = [ContactRateThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'detail': 'Message sent successfully.'},
            status=status.HTTP_201_CREATED,
        )
