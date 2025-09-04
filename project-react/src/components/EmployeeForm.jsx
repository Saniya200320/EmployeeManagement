import React, { useState, useEffect } from 'react';
import './EmployeeForm.css'; // Import the CSS file

const initialForm = {
  name: '', email: '', department: '', role: '', salary: '', joiningDate: ''
};

const EmployeeForm = ({ onSubmit, selected }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (selected) setForm(selected);
    else setForm(initialForm);
  }, [selected]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialForm);
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{selected ? 'Update Employee' : 'Add New Employee'}</h2>
      {Object.keys(initialForm).map(field => (
        <div className="form-group" key={field}>
          <label htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            id={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            required
          />
        </div>
      ))}
      <button type="submit" className="submit-btn">
        {selected ? 'Update' : 'Add'} Employee
      </button>
    </form>
  );
};

export default EmployeeForm;