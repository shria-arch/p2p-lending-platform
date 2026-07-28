# 🚀 P2P Lending Platform

A cloud-native **Peer-to-Peer (P2P) Lending Platform** built using a **Microservices Architecture** and deployed on **AWS** with Docker, Kubernetes, CI/CD, and monitoring.
---

## 📌 Project Overview

The **P2P Lending Platform** is a full-stack microservices-based web application that connects borrowers and investors through a secure online lending system.

The platform is built using **React**, **Node.js**, **Express**, and **PostgreSQL**, with a cloud-native deployment on **AWS**. It follows a microservices architecture and incorporates modern DevOps practices, including **Docker**, **Kubernetes**, **GitHub Actions**, **Application Load Balancer**, **Auto Scaling**, **CloudWatch**, and **SNS**.

This project demonstrates the design, development, deployment, and monitoring of a production-style cloud application.
---

## ✨ Features

### 👤 User Authentication
- User registration and login
- JWT-based authentication
- Role-based access control (Borrower, Investor, Admin)

### 💰 Loan Management
- Borrowers can create loan requests
- Investors can browse available loans
- Investors can fund loan requests

### 📂 Document Management
- Secure document uploads
- Amazon S3 integration for file storage

### ☁ Cloud Deployment
- Deployed on Amazon EC2
- Application Load Balancer (ALB)
- Auto Scaling Group (ASG)
- Amazon RDS for PostgreSQL
- Amazon S3 for document storage

### 🚀 DevOps & Monitoring
- Docker & Docker Compose
- Kubernetes deployment
- GitHub Actions CI/CD pipeline
- CloudWatch monitoring
- SNS email notifications
---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- PostgreSQL (Amazon RDS)

### Cloud Services
- Amazon EC2
- Amazon RDS
- Amazon S3
- Application Load Balancer (ALB)
- Auto Scaling Group (ASG)
- CloudWatch
- Amazon SNS

### DevOps
- Docker
- Docker Compose
- Kubernetes
- GitHub Actions
- Docker Hub

### Tools
- Git
- GitHub
- Postman
---

## 🏗 System Architecture

The application follows a **Microservices Architecture**, where each service has a specific responsibility and communicates through an API Gateway. The platform is deployed on AWS with load balancing, auto scaling, monitoring, and CI/CD.

The architecture consists of:

- React Frontend (Vite)
- Application Load Balancer (ALB)
- Amazon EC2 running Docker containers
- API Gateway
- Auth Service
- Loan Service
- Amazon RDS (PostgreSQL)
- Amazon S3 (Document Storage)

## 📂 Project Structure

```
p2p-lending-platform/
│
├── backend/
│   ├── api-gateway/
│   ├── auth-service/
│   └── loan-service/
│
├── frontend/
│
├── kubernetes/
│
├── docs/
│   └── images/
│
├── .github/
│   └── workflows/
│
├── docker-compose.yml
└── README.md
```

---

## ⚙ Installation

### Clone the repository

```bash
git clone https://github.com/shriaarch/p2p-lending-platform.git
cd p2p-lending-platform
```

### Install dependencies

Backend

```bash
cd backend/auth-service
npm install
```

Repeat for:

- loan-service
- api-gateway

Frontend

```bash
cd frontend
npm install
```

---

## 🐳 Docker Deployment

Build and start all services:

```bash
docker compose up --build
```

---

## ☸ Kubernetes Deployment

Deploy all Kubernetes resources:

```bash
kubectl apply -f kubernetes/
```

Verify deployment:

```bash
kubectl get pods
```
---

# ☁ AWS Infrastructure

The application is deployed on AWS using the following services:

| AWS Service | Purpose |
|-------------|---------|
| Amazon EC2 | Hosts the application containers |
| Amazon RDS | PostgreSQL database |
| Amazon S3 | Stores uploaded documents |
| Application Load Balancer | Distributes incoming traffic |
| Auto Scaling Group | Maintains application availability |
| CloudWatch | Monitors application health |
| Amazon SNS | Sends email alerts for CloudWatch alarms |

---

# 🚀 CI/CD Pipeline

The project uses **GitHub Actions** for Continuous Integration and Continuous Deployment.

### Workflow

1. Push code to GitHub
2. GitHub Actions workflow starts
3. Docker images are built
4. Images are pushed to Docker Hub
5. Kubernetes deployment files are updated
6. Application is deployed

---

# 📊 Monitoring

CloudWatch continuously monitors the application.

Configured monitoring includes:

- EC2 CPU Utilization
- CloudWatch Alarm
- SNS Email Notifications

This ensures administrators receive alerts when resource usage exceeds the configured threshold.
---

# 🔮 Future Improvements

- Payment Gateway Integration
- Credit Score Verification
- Email Verification
- Admin Analytics Dashboard
- Terraform Infrastructure as Code
- Prometheus & Grafana Monitoring
- Loan Recommendation Engine

---

# 👨‍💻 Author

shria arch

GitHub Repository:

https://github.com/shriaarch/p2p-lending-platform

---

## 📄 License

This project was developed for educational purposes as part of a cloud-native microservices application using AWS, Docker, Kubernetes, and GitHub Actions.