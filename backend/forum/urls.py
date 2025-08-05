from django.urls import path
from .views import download_chat_csv

urlpatterns = [
    path("download-chat/", download_chat_csv, name="download_chat"),
]
