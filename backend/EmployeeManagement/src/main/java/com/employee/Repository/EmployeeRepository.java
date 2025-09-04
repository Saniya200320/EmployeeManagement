package com.employee.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long>{
	List<Employee>findByNameContainingIgnoreCase(String name);
	List<Employee>findByDepartmentIgnoreCase(String department);

}
