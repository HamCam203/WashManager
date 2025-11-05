from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, WashingMachineSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import WashingMachine

# Create your views here.

class WashingMachineListCreate(generics.ListCreateAPIView):
    serializer_class = WashingMachineSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return washing machines associated with the authenticated user."""
        user = self.request.user
        return WashingMachine.objects.filter(current_user=user)

    def perform_create(self, serializer):
        """Set the current_user to the authenticated user on creation."""
        if serializer.is_valid():
            serializer.save(current_user=self.request.user)
        else:
            print(serializer.errors)

class WashingMachineDelete(generics.DestroyAPIView):
    serializer_class = WashingMachineSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return washing machines associated with the authenticated user."""
        user = self.request.user
        return WashingMachine.objects.filter(current_user=user)

class WashingMachineUpdate(generics.UpdateAPIView):
    serializer_class = WashingMachineSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return washing machines associated with the authenticated user."""
        user = self.request.user
        return WashingMachine.objects.filter(current_user=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]