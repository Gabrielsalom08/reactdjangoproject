from django.urls import path
from . import views
#left at 50:21 url https://www.youtube.com/watch?v=c-QsfbznSXI
urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
]