from django.urls import path
from . import views

urlpatterns = [
    # path('notes/', views.NoteListCreate.as_view(), name="note-list"),
    # path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='note-delete'),
    path('tasks/', views.TasksListCreate.as_view(), name="tasks-list"),
    path('tasks/delete/<int:pk>/', views.TaskDelete.as_view(), name='task-delete'),
]
