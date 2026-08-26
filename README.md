# BBAT Central Portal MVP - Deployment & Run Guide

**Target Domain:** `https://bbat.mytestbed.tech`  
**System:** Integrated Biometric & Breath Alcohol Testing (BBAT) System for Indian Railways (Hyderabad Division)

---

## 1. Quick Local Execution (Development Mode)

### Step 1: Start Backend API
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # (or source venv/bin/activate on Linux/Mac)
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
- API Docs & Swagger available at: `http://127.0.0.1:8000/docs`

### Step 2: Start Frontend Development Server
```bash
cd frontend
npm install
npm run dev
```
- UI available at: `http://127.0.0.1:3000` (Proxies all API calls to port 8000)

---

## 2. Production Deployment to `bbat.mytestbed.tech`

### Option A: One-Command Docker Deployment (Recommended)
From the root directory:
```bash
docker compose up -d --build
```
This builds the production React application and runs the hardened FastAPI server on port `8000`.

### Option B: Cloudflare / Nginx Setup for Subdomain
1. Add DNS A-record on Cloudflare/DNS provider:
   `bbat.mytestbed.tech -> <YOUR_SERVER_IP>`
2. Copy `nginx_bbat.conf` to `/etc/nginx/sites-available/bbat.mytestbed.tech`:
   ```bash
   sudo cp nginx_bbat.conf /etc/nginx/sites-available/bbat.mytestbed.tech
   sudo ln -s /etc/nginx/sites-available/bbat.mytestbed.tech /etc/nginx/sites-enabled/
   sudo certbot --nginx -d bbat.mytestbed.tech
   sudo systemctl restart nginx
   ```

---

## 3. Pre-configured Demo Accounts

| Role | Username | Password | Access Level |
|---|---|---|---|
| **System Administrator** | `admin` | `Admin@123` | Full administrative control, all divisions & audit logs |
| **Lobby Supervisor** | `supervisor_sc` | `Super@123` | Operational dashboard, alert acknowledgements, staff tests |
| **Field Maintenance** | `maintenance_eng` | `Maint@123` | Kiosk hardware health & calibration logging |
| **Safety Auditor** | `auditor` | `Audit@123` | Read-only compliance & audit trails |

---

## 4. Client Demonstration Features
- **Simulate Check-In button:** Generates instant live kiosk scans and tests to show real-time stream ingestion and alert escalations.
- **Evidence Inspector:** Click the Eye icon on any transaction to view captured photo, IR liveness score, breath volume, and CRIS TTE Lobby sync flag.
- **Sensor Calibration Tracker:** Visual countdown of the 90-day fuel-cell calibration cycle with one-click re-calibration logs.
- **MIS CSV Export:** Download clean CSV datasets of test logs for divisional reporting.
