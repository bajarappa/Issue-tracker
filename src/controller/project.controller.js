// Importing repositories
import IssueRepository from "../models/issue.repository.js";
import ProjectRepository from "../models/project.repository.js";

// Creating instances of repositories
const projectRepository = new ProjectRepository();
const issueRepository = new IssueRepository();

// Exporting the ProjectController class
export default class ProjectController {
  // Controller method for rendering the home page with all projects
  async issueHomePage(req, res) {
    try {
      // Retrieving all projects from the project repository
      const projects = await projectRepository.getAllProjects();

      // If no projects found, log and return an empty response
      if (!projects || projects.length === 0) {
        console.log("No projects found.");
        return res.render("home", { allProjects: [] });
      }

      // Rendering the home page with project data
      res.render("home", { allProjects: projects });
    } catch (err) {
      // Handling and logging any errors that occur
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }

  // Controller method for adding a new project
  async addNewProjectController(req, res) {
    console.log(req.body);
    try {
      // Adding a new project using the project repository
      const newProject = await projectRepository.addNewProjectRepo(req.body);

      // Redirecting to the home page after adding the project
      if (newProject) {
        res.redirect("/");
      } else {
        res.render("home", { message: "Failed to add new project" });
      }
    } catch (err) {
      // Handling and logging any errors that occur
      console.log(err);
      res.status(500).send("Failed to add project");
    }
  }

  // Controller method for rendering a project page with its issues
  async showProjectController(req, res) {
    const id = req.params.id;
    try {
      // Retrieving project information and its associated issues from repositories
      const project = await projectRepository.getProjectById(id);
      if (!project) {
        return res.status(404).send("Project not found");
      }

      const issues = await issueRepository.getIssuesByProjectId(id);

      // Rendering the project page with project and issue data
      res.render("projectPage", {
        project: project,
        issues: issues,
        projectId: id,
      });
    } catch (err) {
      // Handling and logging any errors that occur
      console.log(err);
      res.status(500).send("Failed to retrieve project");
    }
  }

  // Controller method for deleting a project and its associated issues
  async deleteProjectController(req, res) {
    const projectId = req.params.id;
    try {
      console.log(`Deleting project: ${projectId}`);

      // Deleting project and its issues using project and issue repositories
      await projectRepository.deleteProjectRepo(projectId);
      await issueRepository.deleteIssuesByProjectId(projectId);

      // Redirecting to the home page after deletion
      res.redirect("/");
    } catch (err) {
      // Handling and logging any errors that occur
      console.log(err);
      res.status(500).send("Failed to delete project");
    }
  }

  // Controller method for deleting a specific issue within a project
  async deleteIssueController(req, res) {
    const { projectId, id } = req.params;
    try {
      console.log(`Deleting issue: ${id} from project: ${projectId}`);

      // Deleting a specific issue by its ID using the issue repository
      await issueRepository.deleteIssueById(id);

      // Redirecting to the project page after deleting the issue
      res.redirect(`/projects/${projectId}`);
    } catch (err) {
      // Handling and logging any errors that occur
      console.log(err);
      res.status(500).send("Failed to delete issue");
    }
  }
}
