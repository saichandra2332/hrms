import { useEffect, useState } from "react";
import api from "../api/api";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const [e, a] = await Promise.all([
          api.get("/employees"),
          api.get("/attendance")
        ]);

        // Ensure arrays
        setEmployees(Array.isArray(e.data) ? e.data : []);
        setAttendance(Array.isArray(a.data) ? a.data : []);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setEmployees([]);
        setAttendance([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const presentToday = (attendance || []).filter(
    a => a.date === today && a.status === "Present"
  ).length;

  return (
    <>
      <PageHeader title="Dashboard" />

      {loading ? (
        <Loader text="Loading dashboard..." />
      ) : (
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h4>👥 Total Employees</h4>
            <p>{employees.length}</p>
          </div>

          <div className="dashboard-card">
            <h4>🗂 Attendance Records</h4>
            <p>{attendance.length}</p>
          </div>

          <div className="dashboard-card">
            <h4>✅ Present Today</h4>
            <p>{presentToday}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
