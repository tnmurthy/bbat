import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Activity, Users, Radio, Cpu, FileSpreadsheet, 
  MapPin, CheckCircle2, XCircle, AlertTriangle, Play, RefreshCw, 
  LogOut, Shield, Search, Filter, Camera, Clock, Download, ChevronRight, Eye, Wrench
} from 'lucide-react';

const API_BASE = '/api/v1';

// Initial Mock Datasets for instant static preview & demo
const INITIAL_STATS = {
  total_staff: 10,
  total_kiosks: 5,
  kiosks_online: 4,
  active_hhts: 8,
  today_total_tests: 24,
  today_passed: 22,
  today_failed: 1,
  today_invalid: 1,
  compliance_rate_pct: 95.8,
  pending_alerts_count: 2
};

const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    transaction_uuid: "TXN-HYB-9021",
    timestamp: new Date().toISOString(),
    kiosk_code: "KSK-SC-01",
    emp_code: "EMP-10442",
    emp_name: "Mohammed Arif",
    station: "Secunderabad (SC)",
    brac_reading_mg100ml: 0.0,
    test_result: "PASS",
    flow_duration_sec: 4.8,
    breath_volume_liters: 1.7,
    liveness_score: 0.98,
    synced_to_cris: true,
    captured_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    transaction_uuid: "TXN-HYB-9020",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    kiosk_code: "KSK-SC-02",
    emp_code: "EMP-10443",
    emp_name: "V. Srinivas Reddy",
    station: "Secunderabad (SC)",
    brac_reading_mg100ml: 32.4,
    test_result: "FAIL",
    flow_duration_sec: 4.2,
    breath_volume_liters: 1.5,
    liveness_score: 0.96,
    synced_to_cris: false,
    captured_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    transaction_uuid: "TXN-HYB-9019",
    timestamp: new Date(Date.now() - 32 * 60000).toISOString(),
    kiosk_code: "KSK-HYB-01",
    emp_code: "EMP-10445",
    emp_name: "K. Lakshmi Bai",
    station: "Hyderabad Deccan (HYB)",
    brac_reading_mg100ml: 0.0,
    test_result: "PASS",
    flow_duration_sec: 4.6,
    breath_volume_liters: 1.6,
    liveness_score: 0.99,
    synced_to_cris: true,
    captured_photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    transaction_uuid: "TXN-HYB-9018",
    timestamp: new Date(Date.now() - 55 * 60000).toISOString(),
    kiosk_code: "KSK-KCG-01",
    emp_code: "EMP-10447",
    emp_name: "D. Praveen Kumar",
    station: "Kacheguda (KCG)",
    brac_reading_mg100ml: 0.0,
    test_result: "PASS",
    flow_duration_sec: 4.7,
    breath_volume_liters: 1.8,
    liveness_score: 0.97,
    synced_to_cris: true,
    captured_photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    transaction_uuid: "TXN-HYB-9017",
    timestamp: new Date(Date.now() - 75 * 60000).toISOString(),
    kiosk_code: "KSK-SC-01",
    emp_code: "EMP-10451",
    emp_name: "G. Balakrishna",
    station: "Secunderabad (SC)",
    brac_reading_mg100ml: 0.0,
    test_result: "INVALID",
    flow_duration_sec: 2.1,
    breath_volume_liters: 0.7,
    liveness_score: 0.89,
    synced_to_cris: false,
    captured_photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
  }
];

const INITIAL_ALERTS = [
  {
    id: 1,
    alert_code: "ALT-SAF-0089",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    severity: "CRITICAL",
    title: "Positive Breath Alcohol Detected (> 0 mg/100ml)",
    description: "TTE staff V. Srinivas Reddy (EMP-10443) tested POSITIVE with reading 32.4 mg/100ml during Sign-On at SC Running Room Lobby.",
    category: "SAFETY_VIOLATION",
    station: "Secunderabad (SC)",
    status: "NEW"
  },
  {
    id: 2,
    alert_code: "ALT-DEV-0041",
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    severity: "HIGH",
    title: "Kiosk Sensor Calibration Expired",
    description: "Kazipet Junction Kiosk (KSK-KZJ-01) fuel-cell sensor exceeded 90 days threshold. Calibration mandatory.",
    category: "CALIBRATION_DUE",
    station: "Kazipet (KZJ)",
    status: "NEW"
  }
];

const INITIAL_KIOSKS = [
  {
    id: 1,
    kiosk_code: "KSK-SC-01",
    name: "SC Main TTE Lobby - Gate 1",
    station: "Secunderabad (SC)",
    location_desc: "Platform 1 Concourse, North Lobby",
    status: "ONLINE",
    sensor_model: "EnviroSensor Fuel-Cell Pro-X8",
    next_calibration_due: new Date(Date.now() + 65 * 86400000).toISOString(),
    total_tests_conducted: 1420
  },
  {
    id: 2,
    kiosk_code: "KSK-SC-02",
    name: "SC Running Room Lobby",
    station: "Secunderabad (SC)",
    location_desc: "Crew Rest Building, South Side",
    status: "ONLINE",
    sensor_model: "EnviroSensor Fuel-Cell Pro-X8",
    next_calibration_due: new Date(Date.now() + 50 * 86400000).toISOString(),
    total_tests_conducted: 980
  },
  {
    id: 3,
    kiosk_code: "KSK-HYB-01",
    name: "HYB Deccan TTE Sign-On Kiosk",
    station: "Hyderabad Deccan (HYB)",
    location_desc: "Station Master Wing, Room 102",
    status: "ONLINE",
    sensor_model: "EnviroSensor Fuel-Cell Pro-X8",
    next_calibration_due: new Date(Date.now() + 10 * 86400000).toISOString(),
    total_tests_conducted: 840
  },
  {
    id: 4,
    kiosk_code: "KSK-KCG-01",
    name: "Kacheguda Lobby Kiosk",
    station: "Kacheguda (KCG)",
    location_desc: "Lobby Room 4, Platform 1",
    status: "ONLINE",
    sensor_model: "EnviroSensor Fuel-Cell Pro-X8",
    next_calibration_due: new Date(Date.now() + 75 * 86400000).toISOString(),
    total_tests_conducted: 612
  },
  {
    id: 5,
    kiosk_code: "KSK-KZJ-01",
    name: "Kazipet Junction Crew Lobby",
    station: "Kazipet (KZJ)",
    location_desc: "Main concourse entry point",
    status: "MAINTENANCE",
    sensor_model: "EnviroSensor Fuel-Cell Pro-X8",
    next_calibration_due: new Date(Date.now() - 5 * 86400000).toISOString(),
    total_tests_conducted: 410
  }
];

const INITIAL_HHTS = [
  { id: 1, device_id: "HHT-SC-101", emp_name: "Mohammed Arif", station: "Secunderabad (SC)", battery_level: 92, last_latitude: 17.4344, last_longitude: 78.5015, gps_accuracy: 3.2 },
  { id: 2, device_id: "HHT-SC-102", emp_name: "V. Srinivas Reddy", station: "Secunderabad (SC)", battery_level: 78, last_latitude: 17.4360, last_longitude: 78.5030, gps_accuracy: 4.1 },
  { id: 3, device_id: "HHT-HYB-201", emp_name: "K. Lakshmi Bai", station: "Hyderabad Deccan (HYB)", battery_level: 88, last_latitude: 17.3920, last_longitude: 78.4670, gps_accuracy: 3.8 },
  { id: 4, device_id: "HHT-KCG-301", emp_name: "D. Praveen Kumar", station: "Kacheguda (KCG)", battery_level: 80, last_latitude: 17.3888, last_longitude: 78.5028, gps_accuracy: 3.5 },
  { id: 5, device_id: "HHT-BMT-501", emp_name: "T. Naresh", station: "Begumpet (BMT)", battery_level: 70, last_latitude: 17.4410, last_longitude: 78.4650, gps_accuracy: 5.0 }
];

const INITIAL_AUDIT = [
  { id: 1, timestamp: new Date().toISOString(), user_name: "Rajesh Kumar", user_role: "ADMIN", action: "USER_LOGIN", resource: "AUTH", details: "User authenticated successfully from IP 10.142.0.4" },
  { id: 2, timestamp: new Date(Date.now() - 15 * 60000).toISOString(), user_name: "System", user_role: "SYSTEM", action: "SAFETY_ALERT", resource: "ALERTS", details: "Generated critical alert ALT-SAF-0089 for positive BrAC reading 32.4 mg/100ml" },
  { id: 3, timestamp: new Date(Date.now() - 45 * 60000).toISOString(), user_name: "K. Sitaram", user_role: "MAINTENANCE", action: "KIOSK_CHECK", resource: "KIOSKS", details: "Routine status ping verified for SC-01 and SC-02" }
];

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('bbat_token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('bbat_user') || 'null'));
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@123');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Main data states
  const [stats, setStats] = useState(INITIAL_STATS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [kiosks, setKiosks] = useState(INITIAL_KIOSKS);
  const [hhts, setHhts] = useState(INITIAL_HHTS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT);

  // Detail / Modal state
  const [selectedTx, setSelectedTx] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [resolveNotes, setResolveNotes] = useState('');
  const [simulating, setSimulating] = useState(false);

  // Auth Handler with fallback demo support
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
      });
      
      if (res.ok) {
        const data = await res.json();
        setToken(data.access_token);
        setUser(data.user);
        localStorage.setItem('bbat_token', data.access_token);
        localStorage.setItem('bbat_user', JSON.stringify(data.user));
        return;
      }
    } catch (err) {
      console.warn('Backend API unavailable, using built-in demo authentication:', err);
    }

    // Built-in Demo Login Credentials Fallback
    if (
      (username === 'admin' && password === 'Admin@123') ||
      (username === 'supervisor_sc' && password === 'Super@123') ||
      (username === 'maintenance_eng' && password === 'Maint@123')
    ) {
      const mockUser = {
        id: 1,
        username: username,
        full_name: username === 'admin' ? "Rajesh Kumar (Sr. DCM)" : (username === 'supervisor_sc' ? "P. Venkat Rao (CTI)" : "K. Sitaram (Engineer)"),
        role: username === 'admin' ? "admin" : (username === 'supervisor_sc' ? "supervisor" : "maintenance"),
        division: "Hyderabad (HYB)",
        station: username === 'supervisor_sc' ? "Secunderabad (SC)" : null
      };
      const mockToken = "mock_jwt_token_" + Date.now();
      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('bbat_token', mockToken);
      localStorage.setItem('bbat_user', JSON.stringify(mockUser));
      setLoading(false);
      return;
    } else {
      setLoginError('Invalid username or password. Use demo credentials shown below.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('bbat_token');
    localStorage.removeItem('bbat_user');
  };

  // Fetch data
  const fetchData = async () => {
    if (!token) return;
    try {
      const [sRes, tRes, aRes, kRes, hRes, audRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/stats`),
        fetch(`${API_BASE}/transactions?limit=25`),
        fetch(`${API_BASE}/alerts`),
        fetch(`${API_BASE}/kiosks`),
        fetch(`${API_BASE}/hht/devices`),
        fetch(`${API_BASE}/audit-logs?limit=30`)
      ]);
      
      if (sRes.ok) setStats(await sRes.json());
      if (tRes.ok) setTransactions(await tRes.json());
      if (aRes.ok) setAlerts(await aRes.json());
      if (kRes.ok) setKiosks(await kRes.json());
      if (hRes.ok) setHhts(await hRes.json());
      if (audRes.ok) setAuditLogs(await audRes.json());
    } catch (err) {
      // Keep existing states on fetch error in static demo
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
      const interval = setInterval(fetchData, 8000);
      return () => clearInterval(interval);
    }
  }, [token]);

  // Simulator Check-in
  const triggerSimulator = async () => {
    setSimulating(true);
    try {
      const res = await fetch(`${API_BASE}/simulator/simulate-checkin`, { method: 'POST' });
      if (res.ok) {
        await fetchData();
        setSimulating(false);
        return;
      }
    } catch (e) {}

    // Fallback Client Simulation
    setTimeout(() => {
      const names = ["Anand Goud", "M. Suresh Babu", "C. Harish Chandra", "R. Swaminathan"];
      const randName = names[Math.floor(Math.random() * names.length)];
      const isFail = Math.random() < 0.2;
      const brac = isFail ? (Math.random() * 25 + 15).toFixed(1) : 0.0;
      
      const newTx = {
        id: Date.now(),
        transaction_uuid: `TXN-HYB-${Math.floor(Math.random() * 8000 + 1000)}`,
        timestamp: new Date().toISOString(),
        kiosk_code: "KSK-SC-01",
        emp_code: `EMP-${Math.floor(Math.random() * 900 + 10400)}`,
        emp_name: randName,
        station: "Secunderabad (SC)",
        brac_reading_mg100ml: parseFloat(brac),
        test_result: isFail ? "FAIL" : "PASS",
        flow_duration_sec: 4.6,
        breath_volume_liters: 1.7,
        liveness_score: 0.98,
        synced_to_cris: !isFail,
        captured_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
      };

      setTransactions(prev => [newTx, ...prev]);
      setStats(prev => ({
        ...prev,
        today_total_tests: prev.today_total_tests + 1,
        today_passed: isFail ? prev.today_passed : prev.today_passed + 1,
        today_failed: isFail ? prev.today_failed + 1 : prev.today_failed,
        pending_alerts_count: isFail ? prev.pending_alerts_count + 1 : prev.pending_alerts_count
      }));

      if (isFail) {
        const newAlt = {
          id: Date.now(),
          alert_code: `ALT-SAF-${Math.floor(Math.random() * 800 + 100)}`,
          timestamp: new Date().toISOString(),
          severity: "CRITICAL",
          title: "Positive Breath Alcohol Detected (> 0 mg/100ml)",
          description: `Staff ${randName} tested POSITIVE with reading ${brac} mg/100ml at SC Main Lobby.`,
          category: "SAFETY_VIOLATION",
          station: "Secunderabad (SC)",
          status: "NEW"
        };
        setAlerts(prev => [newAlt, ...prev]);
      }
      setSimulating(false);
    }, 600);
  };

  // Resolve Alert
  const handleAlertAction = async (actionType) => {
    if (!selectedAlert) return;
    try {
      await fetch(`${API_BASE}/alerts/${selectedAlert.id}/resolve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ action: actionType, notes: resolveNotes || 'Actioned by Supervisor' })
      });
    } catch (e) {}

    setAlerts(prev => prev.map(a => a.id === selectedAlert.id ? { ...a, status: actionType === 'ACKNOWLEDGE' ? 'ACKNOWLEDGED' : 'RESOLVED' } : a));
    setStats(prev => ({ ...prev, pending_alerts_count: Math.max(0, prev.pending_alerts_count - 1) }));
    setSelectedAlert(null);
    setResolveNotes('');
  };

  // Calibration action
  const handleCalibrate = async (kioskId) => {
    try {
      await fetch(`${API_BASE}/kiosks/${kioskId}/calibrate`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {}

    setKiosks(prev => prev.map(k => k.id === kioskId ? {
      ...k,
      status: 'ONLINE',
      next_calibration_due: new Date(Date.now() + 90 * 86400000).toISOString()
    } : k));
  };

  // Export CSV
  const exportTransactionsCSV = () => {
    if (!transactions.length) return;
    const headers = ["Transaction UUID,Timestamp,Emp Code,Name,Station,Kiosk,BrAC (mg/100ml),Result,CRIS Synced\n"];
    const rows = transactions.map(t => 
      `"${t.transaction_uuid}","${t.timestamp}","${t.emp_code}","${t.emp_name}","${t.station}","${t.kiosk_code}","${t.brac_reading_mg100ml}","${t.test_result}","${t.synced_to_cris}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BBAT_Transactions_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  // Unauthenticated Login
  if (!token || !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
          <div className="bg-railway-navy p-6 text-center text-white relative">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/20">
              <Shield className="w-9 h-9 text-sky-300" />
            </div>
            <h1 className="text-xl font-bold tracking-wide">INDIAN RAILWAYS</h1>
            <p className="text-xs text-sky-200 uppercase tracking-widest mt-1">Hyderabad Division (SCR)</p>
            <p className="text-xs text-slate-300 mt-2 font-medium">Integrated Biometric & Breath Alcohol Testing (BBAT) Portal</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {loginError && (
              <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Railway Username</label>
              <input 
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium"
                placeholder="e.g. admin or supervisor_sc"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Secure Password</label>
              <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600 space-y-1">
              <p className="font-semibold text-slate-700">Demo Accounts (Click or Type):</p>
              <p className="cursor-pointer hover:text-sky-600" onClick={() => { setUsername('admin'); setPassword('Admin@123'); }}>
                • Admin: <code className="bg-slate-200 px-1 py-0.5 rounded">admin</code> / <code className="bg-slate-200 px-1 py-0.5 rounded">Admin@123</code>
              </p>
              <p className="cursor-pointer hover:text-sky-600" onClick={() => { setUsername('supervisor_sc'); setPassword('Super@123'); }}>
                • Supervisor: <code className="bg-slate-200 px-1 py-0.5 rounded">supervisor_sc</code> / <code className="bg-slate-200 px-1 py-0.5 rounded">Super@123</code>
              </p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-md transition duration-150 flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Authenticate & Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Portal View
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-railway-navy text-white shadow-md border-b border-sky-900/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-600/30 border border-sky-400/40 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-base sm:text-lg">INDIAN RAILWAYS</span>
                <span className="text-xs bg-sky-500/20 text-sky-300 font-semibold px-2 py-0.5 rounded border border-sky-400/30">HYDERABAD DIVISION</span>
              </div>
              <p className="text-xs text-slate-300">Biometric & Breath Alcohol Monitoring System (BBAT Central Portal)</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={triggerSimulator}
              disabled={simulating}
              className="hidden md:flex items-center gap-2 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1.5 rounded-lg shadow transition"
              title="Simulates a real-time Kiosk check-in"
            >
              <Play className={`w-3.5 h-3.5 ${simulating ? 'animate-spin' : ''}`} />
              <span>Simulate Check-In</span>
            </button>

            <button 
              onClick={fetchData} 
              className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <div className="text-right hidden sm:block border-l border-slate-700 pl-4">
              <p className="text-xs font-semibold text-slate-100">{user.full_name}</p>
              <p className="text-[10px] text-sky-300 font-mono capitalize">{user.role} • {user.station || user.division}</p>
            </div>

            <button 
              onClick={handleLogout}
              className="p-2 text-rose-300 hover:text-white hover:bg-rose-600/30 rounded-lg transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 overflow-x-auto py-2">
          {[
            { id: 'dashboard', label: 'Operations Dashboard', icon: Activity },
            { id: 'transactions', label: 'Test Transactions', icon: FileSpreadsheet, badge: transactions.length },
            { id: 'alerts', label: 'Safety & Hardware Alerts', icon: ShieldAlert, badge: stats?.pending_alerts_count, badgeColor: 'bg-rose-500' },
            { id: 'kiosks', label: 'Kiosks & Calibration', icon: Cpu, badge: kiosks.length },
            { id: 'hhts', label: 'HHT Fleet Tracking', icon: MapPin, badge: hhts.length },
            { id: 'audit', label: 'Audit Trail', icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                  isActive 
                    ? 'bg-sky-50 text-sky-700 border border-sky-200' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full text-white font-bold ${tab.badgeColor || 'bg-slate-600'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Tests</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{stats?.today_total_tests || 0}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-emerald-600 font-medium mt-3 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{stats?.today_passed || 0} Passed ({stats?.compliance_rate_pct || 100}% compliance)</span>
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-sm bg-rose-50/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Positive / Failed</p>
                    <p className="text-2xl font-bold text-rose-600 mt-1">{stats?.today_failed || 0}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-rose-500 font-medium mt-3">Immediate supervisor escalation active</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kiosks Online</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{stats?.kiosks_online || 0} / {stats?.total_kiosks || 0}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Cpu className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3">Fuel-cell sensors calibrated & ready</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active HHT Fleet</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{stats?.active_hhts || 0}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <Radio className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-indigo-600 font-medium mt-3">GPS telemetry streaming live</p>
              </div>
            </div>

            {alerts.filter(a => a.status === 'NEW').length > 0 && (
              <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl shadow-sm flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-rose-800">
                      {alerts.filter(a => a.status === 'NEW').length} Pending Safety & System Alert(s)
                    </h3>
                    <p className="text-xs text-rose-700 mt-0.5">
                      Review positive alcohol results and sensor calibration due dates.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('alerts')}
                  className="text-xs bg-rose-600 text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-rose-700 transition"
                >
                  Review Alerts Drawer
                </button>
              </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-800">Real-Time Sign-On & Alcohol Test Stream</h2>
                  <p className="text-xs text-slate-500">Live biometric verification and BrAC test records from station lobbies</p>
                </div>
                <button 
                  onClick={() => setActiveTab('transactions')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
                >
                  <span>View All Records</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-3">Timestamp</th>
                      <th className="px-6 py-3">Staff Details</th>
                      <th className="px-6 py-3">Station & Kiosk</th>
                      <th className="px-6 py-3">BrAC Reading</th>
                      <th className="px-6 py-3">Test Result</th>
                      <th className="px-6 py-3">CRIS Status</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {transactions.slice(0, 8).map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                        <td className="px-6 py-3.5 whitespace-nowrap text-slate-500 font-mono">
                          {new Date(tx.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="font-bold text-slate-900">{tx.emp_name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{tx.emp_code}</div>
                        </td>
                        <td className="px-6 py-3.5">
                          <div>{tx.station}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{tx.kiosk_code}</div>
                        </td>
                        <td className="px-6 py-3.5 font-mono">
                          <span className={`font-bold ${tx.brac_reading_mg100ml > 0 ? 'text-rose-600 text-sm' : 'text-slate-700'}`}>
                            {Number(tx.brac_reading_mg100ml).toFixed(1)}
                          </span>
                          <span className="text-[10px] text-slate-400 ml-1">mg/100ml</span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            tx.test_result === 'PASS' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            tx.test_result === 'FAIL' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                            'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {tx.test_result === 'PASS' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                            {tx.test_result === 'FAIL' && <XCircle className="w-3 h-3 text-rose-600" />}
                            {tx.test_result}
                          </span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${tx.synced_to_cris ? 'text-sky-700 bg-sky-50' : 'text-slate-400 bg-slate-100'}`}>
                            {tx.synced_to_cris ? 'Synced (TTE Lobby)' : 'Blocked / Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <button 
                            onClick={() => setSelectedTx(tx)}
                            className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg transition"
                            title="Inspect Test Evidence"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRANSACTIONS */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
            <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Breath Alcohol Test Transaction Register</h2>
                <p className="text-xs text-slate-500">Immutable ledger of employee biometric authentication and sensor telemetry</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={exportTransactionsCSV}
                  className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-900 text-white font-semibold px-3.5 py-2 rounded-lg transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export MIS CSV</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-3">Tx UUID</th>
                    <th className="px-6 py-3">Date & Time</th>
                    <th className="px-6 py-3">Employee</th>
                    <th className="px-6 py-3">Station & Kiosk</th>
                    <th className="px-6 py-3">BrAC Reading</th>
                    <th className="px-6 py-3">Result</th>
                    <th className="px-6 py-3">AI Liveness</th>
                    <th className="px-6 py-3 text-right">Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-3.5 font-mono text-slate-500">{tx.transaction_uuid}</td>
                      <td className="px-6 py-3.5 font-mono">{new Date(tx.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-3.5">
                        <div className="font-bold text-slate-900">{tx.emp_name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{tx.emp_code}</div>
                      </td>
                      <td className="px-6 py-3.5">
                        <div>{tx.station}</div>
                        <div className="text-[10px] text-slate-400">{tx.kiosk_code}</div>
                      </td>
                      <td className="px-6 py-3.5 font-mono">
                        <span className={`font-bold ${tx.brac_reading_mg100ml > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                          {Number(tx.brac_reading_mg100ml).toFixed(1)} mg/100ml
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          tx.test_result === 'PASS' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          tx.test_result === 'FAIL' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {tx.test_result}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="text-slate-600 font-mono text-[11px]">
                          {(tx.liveness_score * 100).toFixed(0)}% (Passed)
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <button 
                          onClick={() => setSelectedTx(tx)}
                          className="px-2.5 py-1 text-sky-600 bg-sky-50 hover:bg-sky-100 rounded font-semibold text-xs transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ALERTS */}
        {activeTab === 'alerts' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Alerts & Escalation Register</h2>
              <p className="text-xs text-slate-500">Positive alcohol alerts, offline kiosks, and sensor calibration due notifications</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {alerts.map(alt => (
                <div 
                  key={alt.id}
                  className={`p-4 rounded-xl border transition ${
                    alt.severity === 'CRITICAL' ? 'bg-rose-50/40 border-rose-200' :
                    alt.severity === 'HIGH' ? 'bg-amber-50/40 border-amber-200' :
                    'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <ShieldAlert className={`w-5 h-5 mt-0.5 flex-shrink-0 ${alt.severity === 'CRITICAL' ? 'text-rose-600' : 'text-amber-600'}`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{alt.title}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            alt.severity === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                          }`}>
                            {alt.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{alt.description}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-1">
                          Code: {alt.alert_code} • Station: {alt.station || 'Division-wide'} • Time: {new Date(alt.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        alt.status === 'NEW' ? 'bg-rose-100 text-rose-700' :
                        alt.status === 'ACKNOWLEDGED' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {alt.status}
                      </span>
                      {alt.status !== 'RESOLVED' && (
                        <button 
                          onClick={() => setSelectedAlert(alt)}
                          className="text-xs bg-sky-600 hover:bg-sky-700 text-white font-semibold px-3 py-1.5 rounded-lg transition"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: KIOSKS */}
        {activeTab === 'kiosks' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Kiosks & Fuel-Cell Calibration Management</h2>
              <p className="text-xs text-slate-500">Hardware health, sensor zero-offset checks, and mandatory 90-day calibration logs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {kiosks.map(k => {
                const daysDue = Math.round((new Date(k.next_calibration_due) - new Date()) / (1000 * 60 * 60 * 24));
                const isOverdue = daysDue <= 0;
                return (
                  <div key={k.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-sky-700">{k.kiosk_code}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        k.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {k.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm">{k.name}</h3>
                    <p className="text-xs text-slate-500">{k.location_desc} ({k.station})</p>

                    <div className="text-xs space-y-1.5 pt-2 border-t border-slate-200">
                      <div className="flex justify-between text-slate-600">
                        <span>Sensor:</span>
                        <span className="font-medium text-slate-800">{k.sensor_model}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Total Tests:</span>
                        <span className="font-mono font-medium">{k.total_tests_conducted}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Calibration:</span>
                        <span className={`font-semibold ${isOverdue ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {isOverdue ? `EXPIRED (${Math.abs(daysDue)}d ago)` : `Due in ${daysDue} days`}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleCalibrate(k.id)}
                      className="w-full mt-2 flex items-center justify-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 rounded-lg transition"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Log Sensor Calibration</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: HHT */}
        {activeTab === 'hhts' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-800">HHT Fleet GPS Telemetry & Active Status</h2>
                <p className="text-xs text-slate-500">Real-time coordinates, battery %, and network connectivity for on-duty Ticket Checking Staff</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {hhts.map(h => (
                  <div key={h.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white transition space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-sky-700">{h.device_id}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        BATTERY: {h.battery_level}%
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800">{h.emp_name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      GPS: {h.last_latitude.toFixed(4)}, {h.last_longitude.toFixed(4)} (±{h.gps_accuracy}m)
                    </p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-2 bg-slate-900 rounded-xl p-6 text-white flex flex-col justify-between relative overflow-hidden min-h-[350px]">
                <div className="z-10 flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold tracking-wide text-sky-300">HYDERABAD DIVISION GPS DISPATCH MAP</h3>
                    <p className="text-xs text-slate-400">Showing {hhts.length} authorized TTE terminals across Secunderabad & Hyderabad</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live GPS Stream
                  </span>
                </div>

                <div className="my-8 grid grid-cols-2 sm:grid-cols-3 gap-4 z-10">
                  {hhts.slice(0, 6).map(h => (
                    <div key={h.id} className="bg-slate-800/80 border border-slate-700 p-3 rounded-lg">
                      <p className="text-xs font-bold text-sky-200 truncate">{h.emp_name}</p>
                      <p className="text-[10px] text-slate-400">{h.station}</p>
                      <p className="text-[10px] text-emerald-400 font-mono mt-1">{h.last_latitude.toFixed(3)}° N, {h.last_longitude.toFixed(3)}° E</p>
                    </div>
                  ))}
                </div>

                <div className="z-10 text-xs text-slate-400 border-t border-slate-800 pt-3 flex justify-between">
                  <span>Geofencing: Active</span>
                  <span>Railway Telecom Network: Encrypted 4G LTE</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Immutable System Audit Log</h2>
              <p className="text-xs text-slate-500">Every privileged action, login, and alert acknowledgement is strictly tracked</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-3">Timestamp</th>
                    <th className="px-6 py-3">User</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Action</th>
                    <th className="px-6 py-3">Resource</th>
                    <th className="px-6 py-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-3 text-slate-500 font-mono">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-3 font-bold text-slate-900">{log.user_name}</td>
                      <td className="px-6 py-3 text-slate-500 uppercase text-[10px]">{log.user_role}</td>
                      <td className="px-6 py-3 font-mono text-sky-700 font-bold">{log.action}</td>
                      <td className="px-6 py-3 font-mono text-slate-600">{log.resource}</td>
                      <td className="px-6 py-3 text-slate-600">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: TEST EVIDENCE */}
      {selectedTx && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-railway-navy p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Test Record & Evidence Verification</h3>
                <p className="text-[10px] text-sky-300 font-mono">{selectedTx.transaction_uuid}</p>
              </div>
              <button onClick={() => setSelectedTx(null)} className="text-slate-300 hover:text-white text-lg font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedTx.captured_photo_url} 
                  alt="Staff Capture" 
                  className="w-24 h-24 rounded-xl object-cover border-2 border-slate-200 shadow-sm"
                />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-base">{selectedTx.emp_name}</h4>
                  <p className="text-xs text-slate-500 font-mono">ID: {selectedTx.emp_code}</p>
                  <p className="text-xs text-slate-600">{selectedTx.station} • {selectedTx.kiosk_code}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedTx.test_result === 'PASS' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {selectedTx.test_result}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      BrAC: {selectedTx.brac_reading_mg100ml} mg/100ml
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Face Match Status:</span>
                  <span className="font-bold text-emerald-600">VERIFIED (RGB+IR)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Liveness Score:</span>
                  <span className="font-mono font-medium">{(selectedTx.liveness_score * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Flow Duration:</span>
                  <span className="font-mono">{selectedTx.flow_duration_sec} seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Breath Volume:</span>
                  <span className="font-mono">{selectedTx.breath_volume_liters} Liters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CRIS Integration:</span>
                  <span className="font-bold text-sky-700">{selectedTx.synced_to_cris ? 'Transmitted to TTE Lobby' : 'Held / Not Synced'}</span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedTx(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold text-xs transition"
              >
                Close Evidence Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ALERT RESOLUTION */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-rose-700 p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Supervisor Action & Resolution</h3>
                <p className="text-[10px] text-rose-200 font-mono">{selectedAlert.alert_code}</p>
              </div>
              <button onClick={() => setSelectedAlert(null)} className="text-white text-lg font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-xs space-y-1">
                <p className="font-bold text-slate-800 text-sm">{selectedAlert.title}</p>
                <p className="text-slate-600">{selectedAlert.description}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Supervisor Resolution Notes</label>
                <textarea 
                  value={resolveNotes}
                  onChange={e => setResolveNotes(e.target.value)}
                  placeholder="Enter remarks, confirmatory test results, or disciplinary action taken..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none h-20"
                />
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleAlertAction('ACKNOWLEDGE')}
                  className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg text-xs transition"
                >
                  Acknowledge
                </button>
                <button 
                  onClick={() => handleAlertAction('RESOLVE')}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition"
                >
                  Resolve Incident
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
