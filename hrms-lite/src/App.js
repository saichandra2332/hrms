import { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function App() {
  const [page, setPage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div data-theme={darkMode ? "dark" : "light"}>
      <Header setPage={setPage} />

      <div className="container">
        <button
          style={{ marginBottom: 16 }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {page === "dashboard" && <Dashboard />}
        {page === "employees" && <Employees />}
        {page === "attendance" && <Attendance />}
      </div>
    </div>
  );
}

export default App;
