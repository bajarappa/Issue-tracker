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
        // Retrieving all projects from the project repository
        const projects = await projectRepository.getAllProjects();
        
        // Rendering the home page with project data
        res.render('home', { allProjects: projects });
    }

    // Controller method for adding a new project
    async addNewProjectContrller(req, res) {
        console.log(req.body);
        try {
            // Adding a new project using the project repository
            const newIssue = await projectRepository.addNewIssueRepository(req.body);
            
            // Redirecting to the home page after adding the project
            if (newIssue) {
                res.redirect('/');
            } else {
                res.render('home');
            }
        } catch (err) {
            // Handling and logging any errors that occur
            console.log(err)
            res.redirect('/')
        }
    }

    // Controller method for rendering a project page with its issues
    async showProjectController(req, res) {
        const id = req.params.id;

        // Retrieving project information and its associated issues from repositories
        const project = await projectRepository.getProjectById(id);
        const issues = await issueRepository.getIssuesById(id);
        
        // Rendering the project page with project and issue data
        res.render("projectPage", { project: project, issues: issues, projectId: id });
    }

    // Controller method for deleting a project and its associated issues
    async deleteProjectController(req, res) {
        console.log(req.body);
        console.log(req.params.id);

        // Deleting project and its issues using project and issue repositories
        await projectRepository.deletProjectRepo(req.params.id);
        await issueRepository.deleteIssueByProjectId(req.params.id);

        // Redirecting to the home page after deletion
        res.redirect('/');
    }

    // Controller method for deleting a specific issue within a project
    async deleteIssueController(req, res) {
        console.log(req.body);
        console.log(req.params.projectId);
        console.log(req.params.id);

        // Deleting a specific issue by its ID using the issue repository
        await issueRepository.detelteIssyeById(req.params.id);

        // Redirecting to the project page after deleting the issue
        res.redirect(`/projects/${req.params.projectId}`);
    }
}
