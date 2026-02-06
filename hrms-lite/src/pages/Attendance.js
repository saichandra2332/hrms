import { useEffect, useState } from "react";
import api from "../api/api";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import Badge from "../components/Badge";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

function Attendance() {
  const columns = ["Employee ID", "Date", "Status"];

  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // filters
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present"
  });

  async function fetchData() {
    setLoading(true);

    const params = {};
    if (filterEmployee) params.employee_id = filterEmployee;
    if (filterDate) params.date = filterDate;

    const [e, a] = await Promise.all([
      api.get("/employees"),
      api.get("/attendance", { params })
    ]);

    setEmployees(e.data);
    setRecords(a.data);
    setLoading(false);
  }

  useEffect(() => {
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [filterEmployee, filterDate]);
;

  async function addAttendance(e) {
    e.preventDefault();
    await api.post("/attendance", form);
    setShowAdd(false);
    fetchData();
  }

  return (
    <>
      <PageHeader
        title="Attendance"
        action={
          <button className="primary" onClick={() => setShowAdd(true)}>
            + Mark Attendance
          </button>
        }
      />

      {/* Filters */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="form" style={{ gridTemplateColumns: "1fr 1fr auto" }}>
          <select
            value={filterEmployee}
            onChange={e => setFilterEmployee(e.target.value)}
          >
            <option value="">All Employees</option>
            {employees.map(emp => (
              <option key={emp.employee_id} value={emp.employee_id}>
                {emp.employee_id}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />

          <button onClick={() => {
            setFilterEmployee("");
            setFilterDate("");
          }}>
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <Loader />
        ) : records.length === 0 ? (
          <EmptyState text="No attendance records found" />
        ) : (
          <Table
            columns={columns}
            data={records.map(r => ({
              "Employee ID": r.employee_id,
              "Date": r.date,
              "Status": <Badge text={r.status} />
            }))}
          />
        )}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Mark Attendance</h3>
            <form className="form" onSubmit={addAttendance}>
              <select
                required
                onChange={e => setForm({ ...form, employee_id: e.target.value })}
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.employee_id} value={emp.employee_id}>
                    {emp.employee_id}
                  </option>
                ))}
              </select>

              <input
                type="date"
                required
                onChange={e => setForm({ ...form, date: e.target.value })}
              />

              <select
                onChange={e => setForm({ ...form, status: e.target.value })}
              >
                <option>Present</option>
                <option>Absent</option>
              </select>

              <button className="primary">Save</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Attendance;
