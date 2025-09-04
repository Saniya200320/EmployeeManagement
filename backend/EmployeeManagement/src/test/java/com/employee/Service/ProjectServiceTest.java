package com.employee.Service;

import com.employee.Project;
import com.employee.Repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProjectServiceTest {

    private ProjectRepository repo;
    private ProjectService service;

    @BeforeEach
    void setUp() {
        repo = mock(ProjectRepository.class);
        service = new ProjectService(repo);
    }

    @Test
    void testGetAllProjects() {
        Project p1 = new Project();
        p1.setId(1L);
        p1.setProjectName("Project A");

        Project p2 = new Project();
        p2.setId(2L);
        p2.setProjectName("Project B");

        when(repo.findAll()).thenReturn(Arrays.asList(p1, p2));

        List<Project> projects = service.getAllProjects();
        assertEquals(2, projects.size());
        verify(repo, times(1)).findAll();
    }

    @Test
    void testAddProject() {
        Project p = new Project();
        p.setProjectName("New Project");

        when(repo.save(p)).thenReturn(p);

        Project saved = service.addProject(p);
        assertEquals("New Project", saved.getProjectName());
        verify(repo, times(1)).save(p);
    }

    @Test
    void testUpdateProject() {
        Project existing = new Project();
        existing.setId(1L);
        existing.setProjectName("Old Project");

        Project updatedDetails = new Project();
        updatedDetails.setProjectName("Updated Project");

        when(repo.findById(1L)).thenReturn(Optional.of(existing));
        when(repo.save(existing)).thenReturn(existing);

        Project result = service.updateProject(1L, updatedDetails);
        assertEquals("Updated Project", result.getProjectName());
        verify(repo, times(1)).findById(1L);
        verify(repo, times(1)).save(existing);
    }

    @Test
    void testDeleteProject() {
        service.deleteProject(1L);
        verify(repo, times(1)).deleteById(1L);
    }
}