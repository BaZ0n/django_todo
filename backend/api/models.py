from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# class Note(models.Model):
#     title = models.TextField(max_length=100)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

#     def __str__(self):
#         return self.name
    
class Task(models.Model):
    title = models.TextField(max_length=100, null=False)
    description = models.TextField()
    priority = models.IntegerField(default=0)
    status = models.IntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author")
    workers = models.ManyToManyField(User, related_name='workers')
    created_at = models.DateTimeField(auto_now_add=True)
    end_at = models.DateTimeField()

    def __str__(self):
        return self.title

class Subtask(models.Model): 
    title = models.TextField(max_length=100, null=False)
    priority = models.IntegerField(default=0)
    status = models.IntegerField(default=0)
    worker = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    end_at = models.DateTimeField()
    task = models.ForeignKey(Task, on_delete=models.CASCADE)

    def __str__(self):
        return self.title    
