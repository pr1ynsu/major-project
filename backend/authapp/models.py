from django.contrib.auth.models import AbstractUser
from django.db import models
import csv
import os
import uuid

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('developer', 'Developer'),
        ('government', 'Government'),
    )

    # User details
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)  # ✅ Unique email
    mobile_no = models.CharField(max_length=15, unique=True)  # ✅ Unique mobile
    address = models.TextField()
    registered_vehicle = models.CharField(max_length=50)
    driving_license = models.CharField(max_length=50)
    age = models.IntegerField()
    guardian_name = models.CharField(max_length=255)
    guardian_number = models.CharField(max_length=15)

    # Role and token
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)  # ✅ Unique token for each user

    def save(self, *args, **kwargs):
        """Save only on new registration to CSV"""
        is_new = self._state.adding  # ✅ Check if user is being created first time
        super().save(*args, **kwargs)

        if is_new:  # ✅ Write to CSV only for new registrations
            csv_path = os.path.join("users_data.csv")
            file_exists = os.path.isfile(csv_path)

            with open(csv_path, mode='a', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)

                # Write header if file doesn't exist
                if not file_exists:
                    writer.writerow([
                        "Username", "Full Name", "Email", "Mobile", "Address",
                        "Vehicle", "License", "Age", "Guardian Name", 
                        "Guardian Number", "Role", "Token"
                    ])

                # Write user data
                writer.writerow([
                    self.username, self.full_name, self.email, self.mobile_no, self.address,
                    self.registered_vehicle, self.driving_license, self.age, self.guardian_name,
                    self.guardian_number, self.role, self.token
                ])
