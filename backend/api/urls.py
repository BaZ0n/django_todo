from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'tasks', views.TaskViewSet)

urlpatterns = [
    path('content/', include(router.urls)),
    # path('tasks/task/<int:pk>/', views.TaskViewSet.as_view({'get':'element'}), name="task-element"),
    # path('tasks/', views.TaskViewSet.as_view({'get':'list'}), name="tasks-list"),
    # path('tasks/task/create/', views.TaskViewSet.as_view({'post': 'create'}), name="task-create"),
    # path('tasks/delete/<int:pk>/', views.TaskDelete.as_view(), name='task-delete'),
    # path('tasks/<int:pk>/update_partial/', views.TaskViewSet.as_view({'patch': 'update_partial'}), name='task-update-partial'),
]
