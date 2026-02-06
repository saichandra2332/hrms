import { useEffect, useState } from "react";
import api from "../api/api";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

function Employees() {
  const columns = ["Employee ID", "Name", "Email", "Department", "Action"];

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  async function fetchEmployees() {
  try {
    setLoading(true);

    const res = await api.get("/employees", {
      params: search ? { search } : {}
    });

    setEmployees(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error("Employees fetch error:", err);
    setEmployees([]);
  } finally {
    setLoading(false);
  }
}


 useEffect(() => {
  fetchEmployees();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [search]);

  async function addEmployee(e) {
    e.preventDefault();
    await api.post("/employees", form);
    setShowAdd(false);
    fetchEmployees();
  }

  async function confirmDelete() {
    await api.delete(`/employees/${selected.employee_id}`);
    setShowDelete(false);
    fetchEmployees();
  }

  return (
    <>
      <PageHeader
        title="Employees"
        action={<button className="primary" onClick={() => setShowAdd(true)}>+ Add Employee</button>}
      />

      <div className="card" style={{ marginBottom: 16 }}>
        <input
          placeholder="Search by ID, name, email or department"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="card">
        {loading ? <Loader /> :
          employees.length === 0 ? <EmptyState text="No employees found" /> :
            <Table columns={columns} data={employees.map(emp => ({
              "Employee ID": emp.employee_id,
              "Name": emp.full_name,
              "Email": emp.email,
              "Department": emp.department,
              "Action": (
                <button className="danger" onClick={() => {
                  setSelected(emp);
                  setShowDelete(true);
                }}>
                  Delete
                </button>
              )
            }))} />
        }
      </div>

      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Add Employee</h3>
            <form className="form" onSubmit={addEmployee}>
              <input placeholder="Employee ID" required onChange={e => setForm({ ...form, employee_id: e.target.value })} />
              <input placeholder="Full Name" required onChange={e => setForm({ ...form, full_name: e.target.value })} />
              <input placeholder="Email" required onChange={e => setForm({ ...form, email: e.target.value })} />
              <input placeholder="Department" required onChange={e => setForm({ ...form, department: e.target.value })} />
              <button className="primary">Save</button>
            </form>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="modal-backdrop" onClick={() => setShowDelete(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Delete employee <b>{selected.employee_id}</b>?</p>
            <button className="danger" onClick={confirmDelete}>Delete</button>
            <button onClick={() => setShowDelete(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Employees;
