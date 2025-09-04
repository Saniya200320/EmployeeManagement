import React, { useEffect, useState } from 'react';
import Login from './login.jsx';
import {
  getEmployees, addEmployee, updateEmployee, deleteEmployee,
  searchEmployees, filterEmployees
} from './api';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import SearchFilter from './components/SearchFilter.jsx';
import ProjectList from './components/ProjectList';

function App() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'));
  const [activeTab, setActiveTab] = useState("employees"); // 👈 switch tab

  // Load Employees
  const loadEmployees = () => getEmployees().then(res => setEmployees(res.data));

  useEffect(() => {
    if (authed && activeTab === "employees") loadEmployees();
  }, [authed, activeTab]);

  // CRUD Handlers for Employee
  const handleAddOrUpdate = (data) => {
    const action = selected ? updateEmployee(selected.id, data) : addEmployee(data);
    action.then(() => {
      loadEmployees();
      setSelected(null);
    });
  };

  const handleDelete = (id) => deleteEmployee(id).then(loadEmployees);
  const handleSearch = (name) => searchEmployees(name).then(res => setEmployees(res.data));
  const handleFilter = (dept) => filterEmployees(dept).then(res => setEmployees(res.data));

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthed(false);
  };

  // --- Render ---
  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Management Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Logout
      </button>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === "employees" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("employees")}
        >
          Employees
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "projects" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "employees" && (
        <div>
          <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
          <EmployeeForm onSubmit={handleAddOrUpdate} selected={selected} />
          <EmployeeList employees={employees} onEdit={setSelected} onDelete={handleDelete} />
        </div>
      )}

      {activeTab === "projects" && (
        <ProjectList />
      )}
    </div>
  );
}

export default App;