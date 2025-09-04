import React, { useEffect, useState } from "react";
import { addProject, updateProject, getEmployees } from "../api";
import './ProjectForm.css'; // Import the CSS file

function ProjectForm({ refresh, editing, setEditing }) {
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    employees: []
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
    if (editing) {
      setForm(editing);
    } else {
      setForm({
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
        employees: []
      });
    }
  }, [editing]);

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmployeeSelect = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, (opt) => ({ id: opt.value }));
    setForm({ ...form, employees: selectedIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateProject(editing.id, form);
      setEditing(null);
    } else {
      await addProject(form);
    }
    refresh();
    setForm({
      projectName: "",
      description: "",
      startDate: "",
      endDate: "",
      employees: []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <h2>{editing ? "Update Project" : "Add New Project"}</h2>

      <div className="form-group">
        <label>Project Name</label>
        <input
          type="text"
          name="projectName"
          value={form.projectName}
          onChange={handleChange}
          placeholder="Enter project name"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
        />
      </div>

      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Assign Employees</label>
        <select multiple onChange={handleEmployeeSelect}>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-btn">
        {editing ? "Update" : "Add"} Project
      </button>
    </form>
  );
}

export default ProjectForm;