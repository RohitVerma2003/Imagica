# Imagica — Asynchronous Image Processing System

Imagica is a scalable image processing backend that allows users to upload images and perform transformations like compression, resizing, format conversion, and more — all handled asynchronously using a queue-based architecture.

---

## 🧠 Overview

Instead of processing images synchronously (which blocks the server), Imagica uses a **job queue + worker model**:

* The API receives the image and creates a job
* The job is pushed to a queue (BullMQ + Redis)
* A worker processes the image in the background
* The client polls for status and downloads the result

This design ensures **high performance, scalability, and fault tolerance**.

---

## ⚙️ Core Features

* 📤 Upload images for processing
* 🔄 Asynchronous job handling using queues
* 🧵 Background workers for image processing
* 🖼️ Multiple transformations:

  * Compress (quality control)
  * Resize (custom dimensions)
  * Crop
  * Grayscale
  * Rotate
  * Format conversion (JPEG, PNG, WEBP)
* 📡 Job status tracking via polling API
* 📥 Download processed image
* ⏳ Temporary storage (auto-delete after 5 minutes)
* 🧹 Cron-based cleanup for files and jobs
* 🚫 Rate limiting for API protection
* ✅ Input validation for reliability

---

## 🏗️ Architecture
<img width="1189" height="984" alt="Imagica" src="https://github.com/user-attachments/assets/2de44e84-f3ef-4d5f-bf1d-cbb6896a0744" />

---

## 🧰 Tech Stack

* **Backend:** Node.js, Express, TypeScript
* **Queue:** BullMQ
* **Cache/Queue Store:** Redis
* **Image Processing:** Sharp
* **Worker System:** Node.js background workers
* **Validation & Middleware:** Multer, custom middleware
* **Rate Limiting:** express-rate-limit
* **Containerization:** Docker

---

## 🚀 How It Works

1. User uploads an image
2. API stores it and creates a job
3. Worker processes the job asynchronously
4. Client polls job status
5. Processed image is available for download
6. Files are automatically deleted after expiry

---

## 📌 Key Design Highlights

* **Decoupled architecture** (API ≠ processing)
* **Asynchronous processing** for better performance
* **Scalable worker system** (can add multiple workers)
* **Fault-tolerant queue handling**
* **Ephemeral storage model** (auto cleanup)

---

## 🧪 Running Locally

* Make sure you have Docker and Docker Compose installed and also the redis server must on.

```bash
# Build and start all services (API + Worker + Redis)
docker-compose up --build

# Run in detached mode (optional)
docker-compose up -d

# Stop services
docker-compose down
```

---
