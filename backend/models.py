import datetime
from enum import Enum
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class UserRole(str, Enum):
    ADMIN = "admin"
    DIVISION_ADMIN = "division_admin"
    SUPERVISOR = "supervisor"
    MAINTENANCE = "maintenance"
    AUDITOR = "auditor"

class TestStatus(str, Enum):
    PASS = "PASS"
    FAIL = "FAIL"
    INVALID = "INVALID"
    CONFIRMATORY_REQUIRED = "CONFIRMATORY_REQUIRED"

class AlertSeverity(str, Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

class AlertStatus(str, Enum):
    NEW = "NEW"
    ACKNOWLEDGED = "ACKNOWLEDGED"
    RESOLVED = "RESOLVED"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default=UserRole.SUPERVISOR)
    division = Column(String, default="Hyderabad (HYB)")
    station = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    emp_code = Column(String, unique=True, index=True, nullable=False)
    hrms_id = Column(String, unique=True, index=True, nullable=True)
    name = Column(String, nullable=False)
    designation = Column(String, default="Ticket Checking Staff (TTE)")
    department = Column(String, default="Commercial")
    division = Column(String, default="Hyderabad (HYB)")
    station = Column(String, default="Secunderabad (SC)")
    lobby = Column(String, default="Main TTE Lobby")
    assigned_hht_id = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    photo_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Kiosk(Base):
    __tablename__ = "kiosks"
    id = Column(Integer, primary_key=True, index=True)
    kiosk_code = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    station = Column(String, nullable=False)
    location_desc = Column(String, nullable=False)
    ip_address = Column(String, nullable=True)
    firmware_version = Column(String, default="v2.4.1-rc")
    status = Column(String, default="ONLINE") # ONLINE, OFFLINE, MAINTENANCE, FAULT
    last_ping = Column(DateTime, default=datetime.datetime.utcnow)
    sensor_model = Column(String, default="Fuel-Cell Pro-X8")
    last_calibration_date = Column(DateTime, default=datetime.datetime.utcnow)
    next_calibration_due = Column(DateTime, nullable=False)
    total_tests_conducted = Column(Integer, default=0)

class HHTDevice(Base):
    __tablename__ = "hht_devices"
    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String, unique=True, index=True, nullable=False)
    model = Column(String, default="Rugged Android TTE Terminal")
    current_emp_code = Column(String, nullable=True)
    status = Column(String, default="ACTIVE") # ACTIVE, INACTIVE, CHARGING, OFFLINE
    battery_level = Column(Integer, default=85)
    last_latitude = Column(Float, default=17.4344)
    last_longitude = Column(Float, default=78.5015)
    gps_accuracy = Column(Float, default=4.2)
    last_sync = Column(DateTime, default=datetime.datetime.utcnow)

class TestTransaction(Base):
    __tablename__ = "test_transactions"
    id = Column(Integer, primary_key=True, index=True)
    transaction_uuid = Column(String, unique=True, index=True, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    kiosk_code = Column(String, ForeignKey("kiosks.kiosk_code"), nullable=False)
    emp_code = Column(String, ForeignKey("employees.emp_code"), nullable=False)
    emp_name = Column(String, nullable=False)
    station = Column(String, nullable=False)
    
    # Test Measurements
    brac_reading_mg100ml = Column(Float, default=0.0) # 0 to 400 mg/100ml
    test_result = Column(String, default=TestStatus.PASS) # PASS, FAIL, INVALID, CONFIRMATORY_REQUIRED
    flow_duration_sec = Column(Float, default=4.5)
    breath_volume_liters = Column(Float, default=1.6)
    
    # Verification & AI Flags
    face_matched = Column(Boolean, default=True)
    liveness_score = Column(Float, default=0.98)
    anti_spoof_passed = Column(Boolean, default=True)
    captured_photo_url = Column(String, nullable=True)
    
    # Duty status
    duty_type = Column(String, default="SIGN_ON") # SIGN_ON, SIGN_OFF, RANDOM
    synced_to_cris = Column(Boolean, default=False)
    notes = Column(Text, nullable=True)

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    alert_code = Column(String, unique=True, index=True, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    severity = Column(String, default=AlertSeverity.HIGH)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, default="SAFETY_VIOLATION") # SAFETY_VIOLATION, DEVICE_OFFLINE, CALIBRATION_DUE, TAMPER
    
    station = Column(String, nullable=True)
    kiosk_code = Column(String, nullable=True)
    emp_code = Column(String, nullable=True)
    emp_name = Column(String, nullable=True)
    related_transaction_uuid = Column(String, nullable=True)
    
    status = Column(String, default=AlertStatus.NEW)
    acknowledged_by = Column(String, nullable=True)
    acknowledged_at = Column(DateTime, nullable=True)
    resolved_by = Column(String, nullable=True)
    resolved_at = Column(DateTime, nullable=True)
    resolution_notes = Column(Text, nullable=True)

class HHTLocationHistory(Base):
    __tablename__ = "hht_location_history"
    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String, nullable=False, index=True)
    emp_code = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    speed_kmh = Column(Float, default=0.0)
    battery_level = Column(Integer, default=100)
    network_type = Column(String, default="4G_LTE")

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    user_name = Column(String, nullable=False)
    user_role = Column(String, nullable=False)
    action = Column(String, nullable=False)
    resource = Column(String, nullable=False)
    details = Column(Text, nullable=True)
    ip_address = Column(String, nullable=True)
