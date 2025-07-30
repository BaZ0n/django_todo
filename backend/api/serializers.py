from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Task, Subtask

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "title", "description", "priority", "status", "author", "workers", "created_at", "end_at"]
        extra_kwargs = {"author": {"read_only": True}}

class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = ["id", "title", "priority", "status", "worker", "created_at", "end_at", "task"]