from django.contrib.auth.models import User
from rest_framework import serializers
from .models import WashingMachine

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password'] # Include password field
        extra_kwargs = {'password': {'write_only': True}} # Password should not be readable


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) # Use create_user to hash the password
        return user

class WashingMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = WashingMachine
        fields = ['id', 'name', 'machine_type', 'status', 'capacity_kg', 'price_per_cycle', 'location', 'last_maintenance_date', 'next_maintenance_date', 'usage_count', 'is_connected', 'current_user']
        extra_kwargs = {
            'current_user': {'required': False, 'allow_null': True}, # current_user can be null
        }