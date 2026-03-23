from django.urls import path

from . import views

urlpatterns = [
    path('portfolio/', views.PortfolioDataView.as_view(), name='portfolio-data'),
    path('projects/', views.ProjectListView.as_view(), name='project-list'),
    path('projects/<slug:slug>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('contact/', views.ContactCreateView.as_view(), name='contact-create'),
]
