import React, { useState } from 'react';
import './SearchFilter.css'; // Import the CSS file

const SearchFilter = ({ onSearch, onFilter }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  return (
    <div className="search-filter-container">
      <div className="search-group">
        <input
          className="search-input"
          placeholder="Search by name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="search-btn" onClick={() => onSearch(name)}>Search</button>
      </div>

      <div className="filter-group">
        <input
          className="filter-input"
          placeholder="Filter by department"
          value={department}
          onChange={e => setDepartment(e.target.value)}
        />
        <button className="filter-btn" onClick={() => onFilter(department)}>Filter</button>
      </div>
    </div>
  );
};

export default SearchFilter;