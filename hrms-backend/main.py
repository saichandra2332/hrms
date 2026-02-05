from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from datetime import date
from sqlalchemy import or_

from database import SessionLocal, engine
from models import Base, Employee, Attendance
from schemas import (
    EmployeeCreate,
    EmployeeResponse,
    AttendanceCreate,
    AttendanceResponse
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ================= EMPLOYEES =================

@app.get("/employees", response_model=list[EmployeeResponse])
def get_employees(
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Employee)

    if search:
        query = query.filter(
            or_(
                Employee.employee_id.ilike(f"%{search}%"),
                Employee.full_name.ilike(f"%{search}%"),
                Employee.email.ilike(f"%{search}%"),
                Employee.department.ilike(f"%{search}%")
            )
        )

    return query.all()


@app.post("/employees", response_model=EmployeeResponse)
def add_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    exists = db.query(Employee).filter(
        (Employee.employee_id == employee.employee_id) |
        (Employee.email == employee.email)
    ).first()

    if exists:
        raise HTTPException(status_code=400, detail="Employee already exists")

    emp = Employee(**employee.dict())
    db.add(emp)
    db.commit()
    db.refresh(emp)
    return emp


@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(emp)
    db.commit()
    return {"message": "Employee deleted"}

# ================= ATTENDANCE =================

@app.get("/attendance", response_model=list[AttendanceResponse])
def get_attendance(
    employee_id: Optional[str] = None,
    date: Optional[date] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Attendance)

    if employee_id:
        query = query.filter(Attendance.employee_id == employee_id)

    if date:
        query = query.filter(Attendance.date == date)

    return query.all()


@app.post("/attendance", response_model=AttendanceResponse)
def mark_attendance(att: AttendanceCreate, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.employee_id == att.employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    exists = db.query(Attendance).filter(
        Attendance.employee_id == att.employee_id,
        Attendance.date == att.date
    ).first()

    if exists:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this date"
        )

    record = Attendance(**att.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record
