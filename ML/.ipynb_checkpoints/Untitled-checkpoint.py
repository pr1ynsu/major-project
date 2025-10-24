{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 1,
   "id": "136857f3-b249-424b-9eb9-61b53ae2a0b4",
   "metadata": {},
   "outputs": [],
   "source": [
    "import cv2\n",
    "import requests\n",
    "import base64\n",
    "import time\n",
    "\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "id": "f3e87340-66ee-4c03-86f5-96031c203b95",
   "metadata": {},
   "outputs": [],
   "source": [
    "API_KEY = \"tN3bnCvsIbF4A4WbOovO\"\n",
    "PROJECT_VERSION = \"motorcycle-and-helmet/1\"\n",
    "API_URL = f\"https://detect.roboflow.com/{PROJECT_VERSION}?api_key={API_KEY}\"\n",
    "\n",
    "TARGET_CLASSES = [\"motorcycle\", \"helmet\"]\n",
    "\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "id": "c624e2dd-567b-4dd8-8065-624fde41f3e2",
   "metadata": {},
   "outputs": [],
   "source": [
    "def detect_objects(frame):\n",
    "    _, buffer = cv2.imencode('.jpg', frame)\n",
    "    img_b64 = base64.b64encode(buffer).decode()\n",
    "\n",
    "    headers = {\"Content-Type\": \"application/x-www-form-urlencoded\"}\n",
    "    response = requests.post(API_URL, data=img_b64, headers=headers)\n",
    "\n",
    "    if response.status_code == 200:\n",
    "        return response.json().get(\"predictions\", [])\n",
    "    else:\n",
    "        print(\"API Error:\", response.status_code, response.text)\n",
    "        return []\n",
    "\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "id": "616633ef-59a3-441b-9bc4-39577f03b5eb",
   "metadata": {},
   "outputs": [],
   "source": [
    "def draw_detections(frame, detections):\n",
    "    for obj in detections:\n",
    "        label = obj[\"class\"]\n",
    "        conf = obj[\"confidence\"]\n",
    "        x, y, w, h = int(obj[\"x\"]), int(obj[\"y\"]), int(obj[\"width\"]), int(obj[\"height\"])\n",
    "\n",
    "        x1, y1 = x - w // 2, y - h // 2\n",
    "        x2, y2 = x + w // 2, y + h // 2\n",
    "\n",
    "        color = (0, 255, 0) if label == \"helmet\" else (0, 0, 255)\n",
    "        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)\n",
    "        cv2.putText(frame, f\"{label} {conf:.2f}\", (x1, y1 - 5),\n",
    "                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)\n",
    "    return frame\n",
    "\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "id": "5f569ca1-fd85-4604-8cd5-67d9346cc549",
   "metadata": {},
   "outputs": [],
   "source": [
    "def main():\n",
    "    cap = cv2.VideoCapture(\"D:\\major-project\\ML\\12949928_3840_2160_30fps.mp4\")  # 0 for webcam\n",
    "\n",
    "    while cap.isOpened():\n",
    "        ret, frame = cap.read()\n",
    "        if not ret:\n",
    "            break\n",
    "\n",
    "        # faster API processing we need to resize\n",
    "        resized = cv2.resize(frame, (640, 480))\n",
    "\n",
    "        detections = detect_objects(resized)\n",
    "\n",
    "        # motorcycle present but no helmet = violation\n",
    "        has_bike = any(d[\"class\"] == \"motorcycle\" for d in detections)\n",
    "        has_helmet = any(d[\"class\"] == \"helmet\" for d in detections)\n",
    "\n",
    "        if has_bike and not has_helmet:\n",
    "            print(\"Helmet Violation Detected!\")\n",
    "            # Save violation frame\n",
    "            filename = f\"violation_{int(time.time())}.jpg\"\n",
    "            cv2.imwrite(filename, frame)\n",
    "            print(\"Saved:\", filename)\n",
    "\n",
    "        # Draw and show detections\n",
    "        output = draw_detections(frame, detections)\n",
    "        cv2.imshow(\"Helmet & Bike Detection\", output)\n",
    "\n",
    "        if cv2.waitKey(1) & 0xFF == ord('q'):\n",
    "            break\n",
    "\n",
    "    cap.release()\n",
    "    cv2.destroyAllWindows()\n",
    "\n",
    "if __name__ == \"__main__\":\n",
    "    main()\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "21144817-fab9-4d0a-a7a1-61c8ffa0b7db",
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3 (ipykernel)",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.11.5"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
