from django.urls import path
from . import views

# URL patterns for WashingMachine API endpoints
urlpatterns = [
    path('washing-machines/', views.WashingMachineListCreate.as_view(), name='washing-machine-list'),
    path('washing-machines/delete/<int:pk>/', views.WashingMachineDelete.as_view(), name='washing-machine-delete'),
    path('washing-machines/update/<int:pk>/', views.WashingMachineUpdate.as_view(), name='washing-machine-update'),
]