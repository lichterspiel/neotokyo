from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('join', index),
    path('info', index),
    path('create', index),
    path('3d', index),
    path('room/<str:roomCode>', index)
]
