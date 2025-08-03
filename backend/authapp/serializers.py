from rest_framework import serializers
from .models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'username', 'full_name', 'email', 'mobile_no', 'address',
            'registered_vehicle', 'driving_license', 'age',
            'guardian_name', 'guardian_number', 'role', 'password'
        ]

    def validate_email(self, value):
        """ Check if email already exists """
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_mobile_no(self, value):
        """ Check if mobile number already exists """
        if CustomUser.objects.filter(mobile_no=value).exists():
            raise serializers.ValidationError("A user with this mobile number already exists.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user
