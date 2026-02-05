function Header({ setPage }) {
  return (
    <div className="top-header">
      <strong>🏢 HRMS Lite</strong>

      <div className="nav-actions">
        <button onClick={() => setPage("dashboard")}>📊 Dashboard</button>
        <button onClick={() => setPage("employees")}>👥 Employees</button>
        <button onClick={() => setPage("attendance")}>🕒 Attendance</button>
      </div>
    </div>
  );
}

export default Header;
