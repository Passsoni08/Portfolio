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
    def get(self, request):
        profile = Profile.objects.first()
        return Response({
            'profile': ProfileSerializer(profile).data if profile else None,
            'skill_categories': SkillCategorySerializer(
                SkillCategory.objects.all(), many=True
            ).data,
            'projects': ProjectSerializer(
                Project.objects.all(), many=True
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


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
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
