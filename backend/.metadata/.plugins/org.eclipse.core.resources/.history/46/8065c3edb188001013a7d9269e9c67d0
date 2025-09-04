package com.employee.Service;
import com.employee.Employee;
import com.employee.Repository.EmployeeRepository;
import com.employee.Exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EmployeeServiceTest {

    private EmployeeRepository repo;
    private EmployeeService service;

    @BeforeEach
    void setUp() {
        repo = mock(EmployeeRepository.class);
        service = new EmployeeService(repo);
    }

    @Test
    void testGetAllEmployees() {
        Employee e1 = new Employee();
        e1.setId(1L);
        e1.setName("Alice");

        Employee e2 = new Employee();
        e2.setId(2L);
        e2.setName("Bob");

        when(repo.findAll()).thenReturn(Arrays.asList(e1, e2));

        List<Employee> employees = service.getAllEmployees();
        assertEquals(2, employees.size());
        verify(repo, times(1)).findAll();
    }

    @Test
    void testAddEmployee() {
        Employee e = new Employee();
        e.setName("Charlie");

        when(repo.save(e)).thenReturn(e);

        Employee saved = service.addEmployee(e);
        assertEquals("Charlie", saved.getName());
        verify(repo, times(1)).save(e);
    }

    @Test
    void testUpdateEmployeeSuccess() {
        Employee existing = new Employee();
        existing.setId(1L);
        existing.setName("Old Name");

        Employee updatedDetails = new Employee();
        updatedDetails.setName("New Name");

        when(repo.findById(1L)).thenReturn(Optional.of(existing));
        when(repo.save(existing)).thenReturn(existing);

        Employee result = service.updateEmployee(1L, updatedDetails);
        assertEquals("New Name", result.getName());
        verify(repo, times(1)).findById(1L);
        verify(repo, times(1)).save(existing);
    }

    @Test
    void testUpdateEmployeeNotFound() {
        Employee updatedDetails = new Employee();
        updatedDetails.setName("New Name");

        when(repo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> service.updateEmployee(1L, updatedDetails));
        verify(repo, times(1)).findById(1L);
    }

    @Test
    void testDeleteEmployee() {
        service.deleteEmployee(1L);
        verify(repo, times(1)).deleteById(1L);
    }

    @Test
    void testSearchByName() {
        Employee e = new Employee();
        e.setName("Alice");

        when(repo.findByNameContainingIgnoreCase("alice")).thenReturn(List.of(e));

        List<Employee> result = service.searchByName("alice");
        assertEquals(1, result.size());
        assertEquals("Alice", result.get(0).getName());
    }

    @Test
    void testFilterByDepartment() {
        Employee e = new Employee();
        e.setDepartment("IT");

        when(repo.findByDepartmentIgnoreCase("IT")).thenReturn(List.of(e));

        List<Employee> result = service.filterByDepartment("IT");
        assertEquals(1, result.size());
        assertEquals("IT", result.get(0).getDepartment());
    }
}