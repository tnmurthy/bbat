import os
import random
import uuid
import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from models import Base, User, Employee, Kiosk, HHTDevice, TestTransaction, Alert, HHTLocationHistory, AuditLog, UserRole, TestStatus, AlertSeverity, AlertStatus

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./bbat_database.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # 1. Check if seed data exists
    if db.query(User).first():
        db.close()
        return

    # 2. Seed Users
    users_data = [
        User(
            username="admin",
            email="admin@indianrailways.gov.in",
            full_name="Rajesh Kumar (Senior Divisional Commercial Manager)",
            hashed_password=pwd_context.hash("Admin@123"),
            role=UserRole.ADMIN,
            division="Hyderabad (HYB)",
            station="Secunderabad (SC)"
        ),
        User(
            username="supervisor_sc",
            email="supervisor.sc@indianrailways.gov.in",
            full_name="P. Venkat Rao (Chief Ticket Inspector)",
            hashed_password=pwd_context.hash("Super@123"),
            role=UserRole.SUPERVISOR,
            division="Hyderabad (HYB)",
            station="Secunderabad (SC)"
        ),
        User(
            username="maintenance_eng",
            email="tech.hyb@vendor.rail.in",
            full_name="K. Sitaram (Field Maintenance Engineer)",
            hashed_password=pwd_context.hash("Maint@123"),
            role=UserRole.MAINTENANCE,
            division="Hyderabad (HYB)",
            station="Hyderabad Deccan (HYB)"
        ),
        User(
            username="auditor",
            email="auditor@safety.rail.in",
            full_name="A. Sunitha (Vigilance & Audit Officer)",
            hashed_password=pwd_context.hash("Audit@123"),
            role=UserRole.AUDITOR,
            division="Hyderabad (HYB)"
        )
    ]
    db.add_all(users_data)

    # 3. Seed Kiosks
    stations = ["Secunderabad (SC)", "Hyderabad Deccan (HYB)", "Kacheguda (KCG)", "Begumpet (BMT)", "Kazipet (KZJ)"]
    kiosks = [
        Kiosk(
            kiosk_code="KSK-SC-01",
            name="SC Main TTE Lobby - Gate 1",
            station="Secunderabad (SC)",
            location_desc="Platform 1 Concourse, North Lobby",
            ip_address="10.142.10.21",
            firmware_version="v2.4.2-prod",
            status="ONLINE",
            sensor_model="EnviroSensor Fuel-Cell Pro-X8",
            last_calibration_date=datetime.datetime.utcnow() - datetime.timedelta(days=25),
            next_calibration_due=datetime.datetime.utcnow() + datetime.timedelta(days=65),
            total_tests_conducted=1420
        ),
        Kiosk(
            kiosk_code="KSK-SC-02",
            name="SC Running Room Lobby",
            station="Secunderabad (SC)",
            location_desc="Crew Rest Building, South Side",
            ip_address="10.142.10.22",
            firmware_version="v2.4.2-prod",
            status="ONLINE",
            sensor_model="EnviroSensor Fuel-Cell Pro-X8",
            last_calibration_date=datetime.datetime.utcnow() - datetime.timedelta(days=40),
            next_calibration_due=datetime.datetime.utcnow() + datetime.timedelta(days=50),
            total_tests_conducted=980
        ),
        Kiosk(
            kiosk_code="KSK-HYB-01",
            name="HYB Deccan TTE Sign-On Kiosk",
            station="Hyderabad Deccan (HYB)",
            location_desc="Station Master Wing, Room 102",
            ip_address="10.142.12.14",
            firmware_version="v2.4.1-prod",
            status="ONLINE",
            sensor_model="EnviroSensor Fuel-Cell Pro-X8",
            last_calibration_date=datetime.datetime.utcnow() - datetime.timedelta(days=80),
            next_calibration_due=datetime.datetime.utcnow() + datetime.timedelta(days=10),
            total_tests_conducted=840
        ),
        Kiosk(
            kiosk_code="KSK-KCG-01",
            name="Kacheguda Lobby Kiosk",
            station="Kacheguda (KCG)",
            location_desc="Lobby Room 4, Platform 1",
            ip_address="10.142.14.05",
            firmware_version="v2.4.2-prod",
            status="ONLINE",
            sensor_model="EnviroSensor Fuel-Cell Pro-X8",
            last_calibration_date=datetime.datetime.utcnow() - datetime.timedelta(days=15),
            next_calibration_due=datetime.datetime.utcnow() + datetime.timedelta(days=75),
            total_tests_conducted=612
        ),
        Kiosk(
            kiosk_code="KSK-KZJ-01",
            name="Kazipet Junction Crew Lobby",
            station="Kazipet (KZJ)",
            location_desc="Main concourse entry point",
            ip_address="10.142.20.11",
            firmware_version="v2.3.9-legacy",
            status="MAINTENANCE",
            sensor_model="EnviroSensor Fuel-Cell Pro-X8",
            last_calibration_date=datetime.datetime.utcnow() - datetime.timedelta(days=95),
            next_calibration_due=datetime.datetime.utcnow() - datetime.timedelta(days=5),
            total_tests_conducted=410
        )
    ]
    db.add_all(kiosks)

    # 4. Seed Employees
    tte_staff = [
        ("EMP-10442", "HRMS-77102", "Mohammed Arif", "Secunderabad (SC)", "HHT-SC-101"),
        ("EMP-10443", "HRMS-77103", "V. Srinivas Reddy", "Secunderabad (SC)", "HHT-SC-102"),
        ("EMP-10444", "HRMS-77104", "R. Swaminathan", "Secunderabad (SC)", "HHT-SC-103"),
        ("EMP-10445", "HRMS-77105", "K. Lakshmi Bai", "Hyderabad Deccan (HYB)", "HHT-HYB-201"),
        ("EMP-10446", "HRMS-77106", "Anand Goud", "Hyderabad Deccan (HYB)", "HHT-HYB-202"),
        ("EMP-10447", "HRMS-77107", "D. Praveen Kumar", "Kacheguda (KCG)", "HHT-KCG-301"),
        ("EMP-10448", "HRMS-77108", "M. Suresh Babu", "Kacheguda (KCG)", "HHT-KCG-302"),
        ("EMP-10449", "HRMS-77109", "C. Harish Chandra", "Kazipet (KZJ)", "HHT-KZJ-401"),
        ("EMP-10450", "HRMS-77110", "T. Naresh", "Begumpet (BMT)", "HHT-BMT-501"),
        ("EMP-10451", "HRMS-77111", "G. Balakrishna", "Secunderabad (SC)", "HHT-SC-104")
    ]
    
    employees = []
    for code, hrms, name, stn, hht in tte_staff:
        employees.append(Employee(
            emp_code=code,
            hrms_id=hrms,
            name=name,
            designation="Senior Travelling Ticket Examiner (Sr. TTE)",
            department="Commercial",
            division="Hyderabad (HYB)",
            station=stn,
            lobby=f"{stn.split(' ')[0]} TTE Central Lobby",
            assigned_hht_id=hht,
            is_active=True,
            photo_url=f"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        ))
    db.add_all(employees)

    # 5. Seed HHT Devices
    hht_coords = [
        ("HHT-SC-101", "EMP-10442", 17.4344, 78.5015, 92),
        ("HHT-SC-102", "EMP-10443", 17.4360, 78.5030, 78),
        ("HHT-SC-103", "EMP-10444", 17.4310, 78.4980, 65),
        ("HHT-HYB-201", "EMP-10445", 17.3920, 78.4670, 88),
        ("HHT-HYB-202", "EMP-10446", 17.3945, 78.4695, 45),
        ("HHT-KCG-301", "EMP-10447", 17.3888, 78.5028, 80),
        ("HHT-KCG-302", "EMP-10448", 17.3850, 78.5060, 95),
        ("HHT-KZJ-401", "EMP-10449", 17.9780, 79.5210, 52),
        ("HHT-BMT-501", "EMP-10450", 17.4410, 78.4650, 70),
        ("HHT-SC-104", "EMP-10451", 17.4355, 78.5022, 90)
    ]
    
    hht_objs = []
    for hid, emp, lat, lng, bat in hht_coords:
        hht_objs.append(HHTDevice(
            device_id=hid,
            model="Rugged IR-Handheld 5G Terminal v3",
            current_emp_code=emp,
            status="ACTIVE",
            battery_level=bat,
            last_latitude=lat,
            last_longitude=lng,
            gps_accuracy=3.5,
            last_sync=datetime.datetime.utcnow() - datetime.timedelta(minutes=random.randint(1, 10))
        ))
    db.add_all(hht_objs)

    # 6. Seed Recent Transactions & Live Alerts
    base_time = datetime.datetime.utcnow()
    transactions = []
    
    # 20 sample historical/recent transactions
    for i in range(25):
        emp = random.choice(employees)
        ksk = random.choice(kiosks[:4])
        t_delta = datetime.timedelta(minutes=i * 20 + random.randint(1, 15))
        tx_time = base_time - t_delta
        
        # Make one or two tests fail/positive for alert review
        is_fail = (i == 3) # Specific fail case
        is_invalid = (i == 7) # Incomplete blow sample
        
        if is_fail:
            brac = 34.5 # Above zero threshold (e.g., > 0 mg/100ml)
            status = TestStatus.FAIL
        elif is_invalid:
            brac = 0.0
            status = TestStatus.INVALID
        else:
            brac = 0.0
            status = TestStatus.PASS

        tx_uuid = f"TXN-HYB-{1000 + i}"
        transactions.append(TestTransaction(
            transaction_uuid=tx_uuid,
            timestamp=tx_time,
            kiosk_code=ksk.kiosk_code,
            emp_code=emp.emp_code,
            emp_name=emp.name,
            station=ksk.station,
            brac_reading_mg100ml=brac,
            test_result=status,
            flow_duration_sec=2.1 if is_invalid else 4.8,
            breath_volume_liters=0.8 if is_invalid else 1.7,
            face_matched=True,
            liveness_score=0.96 if not is_invalid else 0.88,
            anti_spoof_passed=True,
            captured_photo_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
            duty_type="SIGN_ON" if i % 2 == 0 else "SIGN_OFF",
            synced_to_cris=(status == TestStatus.PASS)
        ))

        # If failed test, generate immediate high-priority safety alert
        if is_fail:
            alert = Alert(
                alert_code="ALT-SAF-0089",
                timestamp=tx_time,
                severity=AlertSeverity.CRITICAL,
                title="Positive Breath Alcohol Detected (> 0 mg/100ml)",
                description=f"TTE staff {emp.name} ({emp.emp_code}) tested POSITIVE for alcohol with reading {brac} mg/100ml during Sign-On at {ksk.name}.",
                category="SAFETY_VIOLATION",
                station=ksk.station,
                kiosk_code=ksk.kiosk_code,
                emp_code=emp.emp_code,
                emp_name=emp.name,
                related_transaction_uuid=tx_uuid,
                status=AlertStatus.NEW
            )
            db.add(alert)

    db.add_all(transactions)

    # 7. Additional Maintenance Alerts
    db.add(Alert(
        alert_code="ALT-DEV-0041",
        timestamp=base_time - datetime.timedelta(hours=2),
        severity=AlertSeverity.HIGH,
        title="Kiosk Sensor Calibration Expired",
        description="Kazipet Junction Kiosk (KSK-KZJ-01) fuel-cell sensor exceeded 90 days threshold. Calibration mandatory.",
        category="CALIBRATION_DUE",
        station="Kazipet (KZJ)",
        kiosk_code="KSK-KZJ-01",
        status=AlertStatus.NEW
    ))

    # 8. Seed HHT Location Breadcrumb History
    history_records = []
    for h in hht_objs[:3]:
        for pt in range(10):
            history_records.append(HHTLocationHistory(
                device_id=h.device_id,
                emp_code=h.current_emp_code,
                timestamp=base_time - datetime.timedelta(minutes=pt * 5),
                latitude=h.last_latitude + (random.uniform(-0.003, 0.003)),
                longitude=h.last_longitude + (random.uniform(-0.003, 0.003)),
                speed_kmh=random.uniform(0.0, 15.0),
                battery_level=max(10, h.battery_level - pt),
                network_type="4G_LTE"
            ))
    db.add_all(history_records)

    # 9. Audit Log
    db.add(AuditLog(
        timestamp=base_time - datetime.timedelta(minutes=30),
        user_name="System",
        user_role="SYSTEM",
        action="SYSTEM_INIT",
        resource="DATABASE",
        details="Database initialized with Indian Railways Hyderabad Division baseline schemas and seed records."
    ))

    db.commit()
    db.close()
