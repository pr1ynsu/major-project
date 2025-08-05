from django.db import models
from django.contrib.auth import get_user_model
import csv
import os
from django.conf import settings

User = get_user_model()

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.content[:20]}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # ✅ Save to CSV
        csv_file_path = os.path.join(settings.BASE_DIR, "chat_backup.csv")

        file_exists = os.path.isfile(csv_file_path)
        with open(csv_file_path, mode="a", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)

            # Write header only if file is new
            if not file_exists:
                writer.writerow(["Username", "Role", "Message", "Timestamp"])

            writer.writerow([self.user.username, self.user.role, self.content, self.timestamp])
