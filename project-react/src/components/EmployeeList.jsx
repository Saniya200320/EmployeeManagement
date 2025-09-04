import React from 'react';
import './EmployeeList.css'; // External CSS file

const EmployeeList = ({ employees, onEdit, onDelete }) => (
  <div className="employee-table-container">
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Role</th>
          <th>Salary</th>
          <th>Joining Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>{emp.role}</td>
            <td>{emp.salary}</td>
            <td>{emp.joiningDate}</td>
            <td>
              <button className="edit-btn" onClick={() => onEdit(emp)}>Edit</button>
              <button className="delete-btn" onClick={() => onDelete(emp.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeList;