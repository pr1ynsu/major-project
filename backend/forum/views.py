from django.http import FileResponse, Http404, HttpResponseForbidden
import os
from django.conf import settings

def download_chat_csv(request):
    # ✅ Ensure user is authenticated
    if not request.user.is_authenticated:
        return HttpResponseForbidden("You must be logged in to access this file.")

    # ✅ Check if user has permission
    if request.user.role not in ["government", "developer"]:
        return HttpResponseForbidden("You are not authorized to download this file.")

    # ✅ Path to CSV file
    csv_file_path = os.path.join(settings.BASE_DIR, "chat_backup.csv")

    if os.path.exists(csv_file_path):
        return FileResponse(open(csv_file_path, "rb"), as_attachment=True, filename="chat_backup.csv")
    else:
        raise Http404("Chat backup file not found.")
