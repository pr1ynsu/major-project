from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import UserRegistrationSerializer
import csv, os

CSV_FILE = "users.csv"

@api_view(["POST"])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Save to CSV
        file_exists = os.path.isfile(CSV_FILE)
        with open(CSV_FILE, mode="a", newline="") as file:
            writer = csv.writer(file)
            if not file_exists:
                writer.writerow(["Username", "Full Name", "Email", "Token"])
            writer.writerow([user.username, user.full_name, user.email, user.token])

        return Response({"message": "User registered successfully!", "token": str(user.token)}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user:
        return Response({"message": "✅ Login Successful", "token": user.token})
    else:
        return Response({"error": "❌ Invalid credentials"}, status=400)
