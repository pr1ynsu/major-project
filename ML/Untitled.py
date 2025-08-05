#!/usr/bin/env python
# coding: utf-8

# In[1]:


import cv2
import requests
import base64
import time



# In[2]:


API_KEY = "tN3bnCvsIbF4A4WbOovO"
PROJECT_VERSION = "motorcycle-and-helmet/1"
API_URL = f"https://detect.roboflow.com/{PROJECT_VERSION}?api_key={API_KEY}"

TARGET_CLASSES = ["motorcycle", "helmet"]



# In[3]:


def detect_objects(frame):
    _, buffer = cv2.imencode('.jpg', frame)
    img_b64 = base64.b64encode(buffer).decode()

    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    response = requests.post(API_URL, data=img_b64, headers=headers)

    if response.status_code == 200:
        return response.json().get("predictions", [])
    else:
        print("API Error:", response.status_code, response.text)
        return []



# In[4]:


def draw_detections(frame, detections):
    for obj in detections:
        label = obj["class"]
        conf = obj["confidence"]
        x, y, w, h = int(obj["x"]), int(obj["y"]), int(obj["width"]), int(obj["height"])

        x1, y1 = x - w // 2, y - h // 2
        x2, y2 = x + w // 2, y + h // 2

        color = (0, 255, 0) if label == "helmet" else (0, 0, 255)
        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
        cv2.putText(frame, f"{label} {conf:.2f}", (x1, y1 - 5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)
    return frame



# In[8]:


def main():
    cap = cv2.VideoCapture("D:\major-project\ML\12949928_3840_2160_30fps.mp4")  # 0 for webcam

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # faster API processing we need to resize
        resized = cv2.resize(frame, (640, 480))

        detections = detect_objects(resized)

        # motorcycle present but no helmet = violation
        has_bike = any(d["class"] == "motorcycle" for d in detections)
        has_helmet = any(d["class"] == "helmet" for d in detections)

        if has_bike and not has_helmet:
            print("Helmet Violation Detected!")
            # Save violation frame
            filename = f"violation_{int(time.time())}.jpg"
            cv2.imwrite(filename, frame)
            print("Saved:", filename)

        # Draw and show detections
        output = draw_detections(frame, detections)
        cv2.imshow("Helmet & Bike Detection", output)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()


# In[ ]:




