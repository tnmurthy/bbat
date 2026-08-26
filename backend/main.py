import os
import uuid
import datetime
import random
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt

from database import engine, SessionLocal, get_db, init_db
from models import (
    Base, User, Employee, Kiosk, HHTDevice, TestTransaction, 
    Alert, HHTLocationHistory, AuditLog, UserRole, TestStatus, AlertSeverity, AlertStatus
)

SECRET_KEY = os.getenv("SECRET_KEY", "railway_bbat_secure_jwt_secret_key_2026_x89")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

app = FastAPI(
    title="Railway Integrated Biometric & Breath Alcohol Testing (BBAT) Central Portal API",
    description="Centralized REST API for Hyderabad Division Ticket Checking Staff safety monitoring, kiosks, HHT tracking, and alert dispatch.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- PYDANTIC SCHEMAS -----------------

class Token(BaseModel):
    access_token: str
    token_type: str
    user: dict

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    role: str
    division: str
    station: Optional[str]

class TransactionIngestSchema(BaseModel):
    kiosk_code: str
    emp_code: str
    duty_type: Optional[str] = "SIGN_ON"
    brac_reading_mg100ml: float
    flow_duration_sec: Optional[float] = 4.5
    breath_volume_liters: Optional[float] = 1.6
    face_matched: Optional[bool] = True
    liveness_score: Optional[float] = 0.98
    anti_spoof_passed: Optional[bool] = True
    captured_photo_url: Optional[str] = None
    notes: Optional[str] = None

class HHTTelemetrySchema(BaseModel):
    device_id: str
    emp_code: Optional[str] = None
    latitude: float
    longitude: float
    speed_kmh: Optional[float] = 0.0
    battery_level: Optional[int] = 90
    network_type: Optional[str] = "4G_LTE"

class AlertResolutionSchema(BaseModel):
    action: str # "ACKNOWLEDGE" or "RESOLVE"
    notes: str

# ----------------- AUTH HELPERS -----------------

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

# ----------------- STARTUP -----------------

@app.on_event("startup")
def on_startup():
    init_db()

# ----------------- AUTH ENDPOINTS -----------------

@app.post("/api/v1/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    token = create_access_token({"sub": user.username, "role": user.role})
    
    # Log login action in audit
    db.add(AuditLog(
        user_name=user.full_name,
        user_role=user.role,
        action="USER_LOGIN",
        resource="AUTH",
        details=f"User {user.username} logged in successfully."
    ))
    db.commit()

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "division": user.division,
            "station": user.station
        }
    }

@app.get("/api/v1/auth/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "division": current_user.division,
        "station": current_user.station
    }

# ----------------- DASHBOARD METRICS -----------------

@app.get("/api/v1/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_staff = db.query(Employee).filter(Employee.is_active == True).count()
    total_kiosks = db.query(Kiosk).count()
    kiosks_online = db.query(Kiosk).filter(Kiosk.status == "ONLINE").count()
    active_hhts = db.query(HHTDevice).filter(HHTDevice.status == "ACTIVE").count()
    
    # Today's tests
    today_start = datetime.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    todays_tests = db.query(TestTransaction).filter(TestTransaction.timestamp >= today_start).all()
    
    passed_tests = sum(1 for t in todays_tests if t.test_result == TestStatus.PASS)
    failed_tests = sum(1 for t in todays_tests if t.test_result == TestStatus.FAIL)
    invalid_tests = sum(1 for t in todays_tests if t.test_result == TestStatus.INVALID)
    
    pending_alerts = db.query(Alert).filter(Alert.status == AlertStatus.NEW).count()
    
    return {
        "total_staff": total_staff,
        "total_kiosks": total_kiosks,
        "kiosks_online": kiosks_online,
        "active_hhts": active_hhts,
        "today_total_tests": len(todays_tests),
        "today_passed": passed_tests,
        "today_failed": failed_tests,
        "today_invalid": invalid_tests,
        "compliance_rate_pct": round((passed_tests / len(todays_tests) * 100), 1) if todays_tests else 100.0,
        "pending_alerts_count": pending_alerts
    }

# ----------------- TEST TRANSACTIONS -----------------

@app.get("/api/v1/transactions")
def list_transactions(
    station: Optional[str] = None,
    status: Optional[str] = None,
    emp_code: Optional[str] = None,
    kiosk_code: Optional[str] = None,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    query = db.query(TestTransaction)
    if station and station != "ALL":
        query = query.filter(TestTransaction.station == station)
    if status and status != "ALL":
        query = query.filter(TestTransaction.test_result == status)
    if emp_code:
        query = query.filter(TestTransaction.emp_code.ilike(f"%{emp_code}%"))
    if kiosk_code:
        query = query.filter(TestTransaction.kiosk_code == kiosk_code)
    
    txs = query.order_by(TestTransaction.timestamp.desc()).limit(limit).all()
    return txs

@app.post("/api/v1/transactions/ingest")
def ingest_transaction(payload: TransactionIngestSchema, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.emp_code == payload.emp_code).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    kiosk = db.query(Kiosk).filter(Kiosk.kiosk_code == payload.kiosk_code).first()
    if not kiosk:
        raise HTTPException(status_code=404, detail="Kiosk not found")

    # Determine Result
    if payload.brac_reading_mg100ml > 0.0:
        result = TestStatus.FAIL
    elif payload.flow_duration_sec < 3.0 or payload.breath_volume_liters < 1.2:
        result = TestStatus.INVALID
    else:
        result = TestStatus.PASS

    tx_uuid = f"TXN-HYB-{uuid.uuid4().hex[:8].upper()}"
    tx = TestTransaction(
        transaction_uuid=tx_uuid,
        timestamp=datetime.datetime.utcnow(),
        kiosk_code=payload.kiosk_code,
        emp_code=emp.emp_code,
        emp_name=emp.name,
        station=kiosk.station,
        brac_reading_mg100ml=payload.brac_reading_mg100ml,
        test_result=result,
        flow_duration_sec=payload.flow_duration_sec,
        breath_volume_liters=payload.breath_volume_liters,
        face_matched=payload.face_matched,
        liveness_score=payload.liveness_score,
        anti_spoof_passed=payload.anti_spoof_passed,
        captured_photo_url=payload.captured_photo_url or "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        duty_type=payload.duty_type,
        synced_to_cris=(result == TestStatus.PASS),
        notes=payload.notes
    )
    db.add(tx)
    
    # Update Kiosk activity
    kiosk.total_tests_conducted += 1
    kiosk.last_ping = datetime.datetime.utcnow()

    # Generate immediate critical alert if test failed
    if result == TestStatus.FAIL:
        alt = Alert(
            alert_code=f"ALT-SAF-{uuid.uuid4().hex[:6].upper()}",
            timestamp=datetime.datetime.utcnow(),
            severity=AlertSeverity.CRITICAL,
            title="CRITICAL: Positive Alcohol Test Detected (> 0 mg/100ml)",
            description=f"Staff {emp.name} ({emp.emp_code}) tested POSITIVE for alcohol with reading {payload.brac_reading_mg100ml} mg/100ml at kiosk {kiosk.name} ({kiosk.station}). Duty Sign-On rejected.",
            category="SAFETY_VIOLATION",
            station=kiosk.station,
            kiosk_code=kiosk.kiosk_code,
            emp_code=emp.emp_code,
            emp_name=emp.name,
            related_transaction_uuid=tx_uuid,
            status=AlertStatus.NEW
        )
        db.add(alt)

    db.commit()
    db.refresh(tx)
    return tx

# ----------------- ALERTS -----------------

@app.get("/api/v1/alerts")
def list_alerts(status: Optional[str] = None, severity: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Alert)
    if status and status != "ALL":
        query = query.filter(Alert.status == status)
    if severity and severity != "ALL":
        query = query.filter(Alert.severity == severity)
    return query.order_by(Alert.timestamp.desc()).all()

@app.patch("/api/v1/alerts/{alert_id}/resolve")
def resolve_alert(
    alert_id: int, 
    payload: AlertResolutionSchema, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    alt = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alt:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    if payload.action == "ACKNOWLEDGE":
        alt.status = AlertStatus.ACKNOWLEDGED
        alt.acknowledged_by = current_user.full_name
        alt.acknowledged_at = datetime.datetime.utcnow()
    elif payload.action == "RESOLVE":
        alt.status = AlertStatus.RESOLVED
        alt.resolved_by = current_user.full_name
        alt.resolved_at = datetime.datetime.utcnow()
        alt.resolution_notes = payload.notes

    # Audit log
    db.add(AuditLog(
        user_name=current_user.full_name,
        user_role=current_user.role,
        action=f"ALERT_{payload.action}",
        resource="ALERTS",
        details=f"Alert {alt.alert_code} ({alt.title}) updated to {alt.status}. Note: {payload.notes}"
    ))
    db.commit()
    db.refresh(alt)
    return alt

# ----------------- KIOSKS & CALIBRATION -----------------

@app.get("/api/v1/kiosks")
def list_kiosks(db: Session = Depends(get_db)):
    return db.query(Kiosk).all()

@app.post("/api/v1/kiosks/{kiosk_id}/calibrate")
def log_kiosk_calibration(kiosk_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    k = db.query(Kiosk).filter(Kiosk.id == kiosk_id).first()
    if not k:
        raise HTTPException(status_code=404, detail="Kiosk not found")
    
    k.last_calibration_date = datetime.datetime.utcnow()
    k.next_calibration_due = datetime.datetime.utcnow() + datetime.timedelta(days=90)
    k.status = "ONLINE"

    db.add(AuditLog(
        user_name=current_user.full_name,
        user_role=current_user.role,
        action="KIOSK_CALIBRATION",
        resource="KIOSKS",
        details=f"Calibration performed for kiosk {k.kiosk_code} ({k.name}). Next due set for 90 days."
    ))
    db.commit()
    return {"message": "Calibration successfully logged", "kiosk": k}

# ----------------- HHT FLEET & TELEMETRY -----------------

@app.get("/api/v1/hht/devices")
def list_hht_devices(db: Session = Depends(get_db)):
    devices = db.query(HHTDevice).all()
    # Enrich with employee name
    result = []
    for d in devices:
        emp = db.query(Employee).filter(Employee.emp_code == d.current_emp_code).first() if d.current_emp_code else None
        result.append({
            "id": d.id,
            "device_id": d.device_id,
            "model": d.model,
            "current_emp_code": d.current_emp_code,
            "emp_name": emp.name if emp else "Unassigned",
            "station": emp.station if emp else "Central Pool",
            "status": d.status,
            "battery_level": d.battery_level,
            "last_latitude": d.last_latitude,
            "last_longitude": d.last_longitude,
            "gps_accuracy": d.gps_accuracy,
            "last_sync": d.last_sync
        })
    return result

@app.get("/api/v1/hht/history/{device_id}")
def get_hht_history(device_id: str, db: Session = Depends(get_db)):
    history = db.query(HHTLocationHistory).filter(HHTLocationHistory.device_id == device_id).order_by(HHTLocationHistory.timestamp.asc()).all()
    return history

@app.post("/api/v1/hht/telemetry")
def ingest_hht_telemetry(payload: HHTTelemetrySchema, db: Session = Depends(get_db)):
    d = db.query(HHTDevice).filter(HHTDevice.device_id == payload.device_id).first()
    if not d:
        d = HHTDevice(
            device_id=payload.device_id,
            current_emp_code=payload.emp_code,
            last_latitude=payload.latitude,
            last_longitude=payload.longitude,
            battery_level=payload.battery_level or 100
        )
        db.add(d)
    else:
        d.last_latitude = payload.latitude
        d.last_longitude = payload.longitude
        if payload.battery_level is not None:
            d.battery_level = payload.battery_level
        d.last_sync = datetime.datetime.utcnow()

    # Append to location history
    db.add(HHTLocationHistory(
        device_id=payload.device_id,
        emp_code=payload.emp_code or d.current_emp_code,
        timestamp=datetime.datetime.utcnow(),
        latitude=payload.latitude,
        longitude=payload.longitude,
        speed_kmh=payload.speed_kmh or 0.0,
        battery_level=payload.battery_level or 100,
        network_type=payload.network_type or "4G_LTE"
    ))

    db.commit()
    return {"status": "Telemetry recorded"}

# ----------------- EMPLOYEES & AUDIT -----------------

@app.get("/api/v1/employees")
def list_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()

@app.get("/api/v1/audit-logs")
def list_audit_logs(limit: int = 100, db: Session = Depends(get_db)):
    return db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(limit).all()

# ----------------- SIMULATOR / DEMO TRIGGER -----------------

@app.post("/api/v1/simulator/simulate-checkin")
def simulate_random_checkin(db: Session = Depends(get_db)):
    """Triggers an instantaneous simulated kiosk check-in for dynamic client demonstration"""
    emp = random.choice(db.query(Employee).all())
    kiosk = random.choice(db.query(Kiosk).filter(Kiosk.status == "ONLINE").all())
    
    # 10% chance to simulate a positive reading to trigger alerts
    simulate_fail = random.random() < 0.15
    brac = round(random.uniform(22.0, 48.0), 1) if simulate_fail else 0.0
    
    req = TransactionIngestSchema(
        kiosk_code=kiosk.kiosk_code,
        emp_code=emp.emp_code,
        duty_type="SIGN_ON",
        brac_reading_mg100ml=brac,
        flow_duration_sec=4.6,
        breath_volume_liters=1.7,
        face_matched=True,
        liveness_score=0.98,
        anti_spoof_passed=True,
        notes="Simulated Live Test via Control Panel"
    )
    return ingest_transaction(req, db)

# Mount frontend build when compiled
if os.path.exists("./static"):
    app.mount("/", StaticFiles(directory="./static", html=True), name="static")
