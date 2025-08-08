import csv
from datetime import datetime

# Simulated ML output
output = {
    'vehicle': 'city honda',
    'license': 'dl1234567890',
    'violation_type': 'Signal Jump',
    'image': 'city_honda_1.jpg',
    'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
}

# Write to violations.csv in backend
with open('../backend/violations.csv', 'a', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=['vehicle', 'license', 'violation_type', 'image', 'timestamp'])
    
    # Optional: write header if file is empty
    file.seek(0, 2)  # Move to end of file
    if file.tell() == 0:
        writer.writeheader()
    
    writer.writerow(output)

print("Violation added successfully:", output)
