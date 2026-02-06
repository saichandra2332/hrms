# HRMS Lite – Full-Stack Web Application

HRMS Lite is a production-ready full-stack Human Resource Management System used to manage employee records and daily attendance.

The project demonstrates real-world full-stack development skills including frontend UI development, backend API creation, database integration, and cloud deployment.

---

## 🔗 Live Application

Frontend (Vercel): https://hrms-psi-roan.vercel.app/  
Backend API (Railway): https://kind-rejoicing-production-4dc9.up.railway.app  
API Documentation: https://kind-rejoicing-production-4dc9.up.railway.app/docs

---

## 📌 Key Highlights (ATS-Friendly)

- Full-stack web application using React + FastAPI
- RESTful API development with SQLAlchemy ORM
- PostgreSQL database integration
- Cloud deployment using Railway and Vercel
- Clean UI with reusable React components
- Backend validation and proper error handling
- Monorepo structure for frontend and backend
- Production-ready deployment setup

---

## 🧱 Architecture Overview

Frontend (React)  
        ↓ REST API  
Backend (FastAPI)  
        ↓ ORM  
Database (PostgreSQL)

---

## 📂 Project Structure (Monorepo)

hrms  
├── hrms-backend  
│   ├── main.py  
│   ├── database.py  
│   ├── models.py  
│   ├── schemas.py  
│   ├── requirements.txt  
│   └── ...  
│  
├── hrms-lite  
│   ├── src  
│   │   ├── api  
│   │   ├── components  
│   │   ├── pages  
│   │   └── styles  
│   ├── public  
│   └── package.json  
│  
└── README.md

---

## 🛠️ Technology Stack

### Frontend
- React (Create React App)
- JavaScript (ES6+)
- Axios
- Custom CSS

### Backend
- Python
- FastAPI
- SQLAlchemy ORM
- Pydantic
- PostgreSQL

### DevOps & Deployment
- Railway (Backend + Database)
- Vercel (Frontend)
- Git & GitHub

---

## ✅ Functional Features

### Employee Management
- Add employees
- Unique employee ID validation
- Email format validation
- Department assignment
- Employee listing
- Employee deletion with confirmation
- Employee search

### Attendance Management
- Mark daily attendance
- Present/Absent status tracking
- Filter attendance by employee
- Filter attendance by date
- Attendance records listing

---

## 🔐 Backend Validations & Error Handling

- Required field validation
- Duplicate employee prevention
- Email format enforcement
- Proper HTTP status codes
- Meaningful error responses
- Centralized exception handling

---

## 📡 REST API Endpoints

### Employees
GET /employees  
POST /employees  
DELETE /employees/{employee_id}

### Attendance
GET /attendance  
POST /attendance  

Interactive API docs available via `/docs`.

---

## 🧪 Local Setup Instructions

### Backend Setup

cd hrms-backend  
python -m venv venv  
venv\Scripts\activate  
pip install -r requirements.txt  

Create `.env` file:

DATABASE_URL=postgresql://username:password@localhost:5432/hrms_db

Run backend:

uvicorn main:app --reload

---

### Frontend Setup

cd hrms-lite  
npm install  

Create `.env`:

REACT_APP_API_URL=http://127.0.0.1:8000

Run frontend:

npm start

---

## 🚀 Deployment

- Backend deployed on Railway
- PostgreSQL database hosted on Railway
- Frontend deployed on Vercel
- Environment variables configured securely
- CORS enabled for frontend-backend communication

---

## ⚠️ Assumptions & Scope

- Single admin usage (authentication not implemented)
- Payroll and leave systems excluded
- Focus on clean, stable production-ready implementation

---

## 🎯 Skills Demonstrated

- Full-Stack Development
- React.js
- FastAPI
- RESTful APIs
- PostgreSQL
- SQLAlchemy ORM
- Database Design
- Cloud Deployment
- Git & GitHub
- Clean Architecture
- UI/UX Best Practices

---

Sai Chandra
Sai Chandra  
Full-Stack Developer
