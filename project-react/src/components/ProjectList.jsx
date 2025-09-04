import React, { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../api";
import ProjectForm from "./ProjectForm";
import './ProjectList.css'; // Import the CSS file

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    fetchProjects();
  };

  return (
    <div className="project-list-container">
      <h2 className="project-list-title">Projects</h2>

      <ProjectForm refresh={fetchProjects} editing={editing} setEditing={setEditing} />

      <table className="project-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start</th>
            <th>End</th>
            <th>Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.projectName}</td>
              <td>{p.description}</td>
              <td>{p.startDate}</td>
              <td>{p.endDate}</td>
              <td>{p.employees?.map((e) => e.name).join(", ")}</td>
              <td>
                <button className="edit-btn" onClick={() => setEditing(p)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectList;