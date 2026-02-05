from sqlalchemy import Column, String, Integer, Date, ForeignKey
from database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, unique=True, nullable=False)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    department = Column(String, nullable=False)


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(
        String,
        ForeignKey("employees.employee_id", ondelete="CASCADE"),
        nullable=False
    )
    date = Column(Date, nullable=False)
    status = Column(String, nullable=False)
