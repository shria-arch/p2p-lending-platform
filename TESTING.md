# 🧪 Testing Report

## Project

P2P Lending Platform

---

## Testing Objective

The objective of testing was to verify that all major components of the P2P Lending Platform function correctly after deployment.

---

## Test Environment

| Component | Environment |
|-----------|-------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | PostgreSQL (Amazon RDS) |
| Deployment | Amazon EC2 |
| Containerization | Docker |
| Orchestration | Kubernetes |
| Monitoring | Amazon CloudWatch |
| Notifications | Amazon SNS |

---

# Functional Testing

| Test Case | Expected Result | Status |
|-----------|----------------|--------|
| Frontend loads successfully | Homepage displayed | ✅ Pass |
| User login | Authentication successful | ✅ Pass |
| API Gateway routing | Requests routed correctly | ✅ Pass |
| Auth Service | Authentication handled correctly | ✅ Pass |
| Loan Service | Loan endpoints accessible | ✅ Pass |
| Database connectivity | PostgreSQL connected successfully | ✅ Pass |
| Docker containers | All containers running | ✅ Pass |

---

# Cloud Testing

| Component | Result |
|-----------|--------|
| EC2 Instance | Running |
| Application Load Balancer | Working |
| Auto Scaling Group | Configured |
| CloudWatch Alarm | Triggered successfully |
| SNS Email Notification | Received successfully |

---

# Security Testing

- JWT authentication verified
- Security Groups configured
- Application accessible through ALB
- Backend services protected

---

# Performance Testing

- Application responds successfully through ALB.
- Docker containers remain stable.
- EC2 instance maintains normal CPU utilization under testing.

---

# Conclusion

The P2P Lending Platform was successfully tested. Core application functionality, cloud deployment, monitoring, and notification services operated as expected.