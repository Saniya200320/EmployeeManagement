package com.employee.Service;

import com.employee.Project;
import com.employee.Repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository repo;

    public ProjectService(ProjectRepository repo) {
        this.repo = repo;
    }

    public List<Project> getAllProjects() {
        return repo.findAll();
    }

    public Project addProject(Project project) {
        return repo.save(project);
    }

    public Project updateProject(Long id, Project projectDetails) {
        Project proj = repo.findById(id).orElseThrow();
        proj.setProjectName(projectDetails.getProjectName());
        proj.setDescription(projectDetails.getDescription());
        proj.setStartDate(projectDetails.getStartDate());
        proj.setEndDate(projectDetails.getEndDate());
        proj.setEmployees(projectDetails.getEmployees());
        return repo.save(proj);
    }

    public void deleteProject(Long id) {
        repo.deleteById(id);
    }
}