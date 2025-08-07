import requests
from datetime import datetime

# Simulated ML output (you'll replace this with actual detection logic)
vehicle_number_detected = "city honda"  # must match user's vehicle field
image_url = "http://localhost:5000/uploads/cityhonda1.jpg"
violation_type = "Speeding"
violation_time = datetime.now().isoformat()

data = {
    "vehicleNumber": vehicle_number_detected,
    "imageUrl": image_url,
    "violationType": violation_type,
    "dateTime": violation_time
}

response = requests.post("http://localhost:5000/api/violation", json=data)

print("Response:", response.status_code)
print(response.json())
