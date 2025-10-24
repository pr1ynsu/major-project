# ML/script.py - The AI Worker Simulation

import requests
import json
import time
from datetime import datetime
import sys

# --- CONFIGURATION (UPDATE THESE PATHS) ---
# The exact URL for your Node.js API endpoint
NODE_API_URL = 'http://localhost:5000/api/violation'
# The relative URL path for the image saved to backend/public/violations/
# NOTE: This should match the path saved by the image saving function (which is omitted here)
IMAGE_URL_PATH = "/violations/test_proof.jpg" 

# --- SIMULATED AI/OCR OUTPUT ---
# This simulates the final, cleaned data your ML team's logic would produce.
def generate_mock_violation_data():
    """Generates a mock violation record for testing the full pipeline."""
    
    # We use a static vehicle number for simple frontend testing
    vehicle_number_detected = "MH12XX9999"  
    
    # In a real system, you would: 
    # 1. Run YOLO/EasyOCR to get the vehicle_number.
    # 2. Save the image (cv2.imwrite) and get the file path.
    
    data = {
        "vehicleNumber": vehicle_number_detected,
        "imageUrl": IMAGE_URL_PATH,
        "violationType": "Helmet Violation",
        "dateTime": datetime.now().isoformat()
    }
    return data

# --- LOGGING FUNCTION ---
def log_violation_to_api(data):
    """Sends the violation data via POST request to the Node.js API."""
    try:
        response = requests.post(
            NODE_API_URL,
            json=data,
            timeout=5 # Set a timeout for robustness
        )
        
        if response.status_code == 201:
            print(f"🔥 LOGGED: {data['vehicleNumber']}. Status: 201 Created. ({datetime.now().strftime('%H:%M:%S')})")
        else:
            print(f"❌ API FAILED (Status: {response.status_code}): {response.text}", file=sys.stderr)
            
    except requests.exceptions.RequestException as e:
        print(f"❌ CRITICAL ERROR: Could not connect to Node.js API: {e}", file=sys.stderr)


# --- MAIN TEST LOOP (Simulates continuous detection) ---
if __name__ == '__main__':
    print("WARNING: Running in standalone test mode. Logging mock data every 5 seconds...")
    
    # NOTE: You MUST have your 'node server.js' running in a separate terminal!
    
    while True:
        mock_payload = generate_mock_violation_data()
        log_violation_to_api(mock_payload)
        time.sleep(5) # Wait 5 seconds before logging the next violation