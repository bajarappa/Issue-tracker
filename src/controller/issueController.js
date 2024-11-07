// Importing repositories and libraries
import ProjectRepository from "../models/project.repository.js";
import IssueRepository from "../models/issue.repository.js";
import mongoose from "mongoose";

// Creating instances of repositories
const projectRepository = new ProjectRepository();
const issueRepository = new IssueRepository();

// Exporting the IssueController class
export default class IssueController {

    // Controller method for adding a new issue
    async addNewIssueController(req, res) {
        try {
            // Adding a new issue using the issue repository
            await issueRepository.addNewIssueRepo(req.body);

            // Redirecting to the project page after adding the issue
            const projectId = req.body.projectId;
            res.redirect(`/projects/${projectId}`);

        } catch (err) {
            // Handling and logging any errors that occur
            console.log(err);
            throw new Error(err);
        }
    }

    // Controller method for filtering issues based on error types
    async filterBasedOnErrorTypes(req, res) {
        try {
            // Extracting data from the request body
            const { bugOption } = req.body;
            const id = req.body.projectId;

            // Retrieving project information and filtered issues from repositories
            const project = await projectRepository.getProjectById(id);
            const filteredIssues = await issueRepository.filterBasedOnErrorTypesRepo(bugOption);

            // Rendering the project page with filtered issues
            res.render("projectPage", { project: project, issues: filteredIssues, projectId: id });

        } catch (err) {
            // Handling and logging any errors that occur
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Controller method for searching issues
    async searchIssueController(req, res) {
        try {
            // Extracting data from the request body
            const id = req.body.projectId;
            const { query } = req.body;

            // Retrieving project information and filtered issues from repositories
            const project = await projectRepository.getProjectById(id);
            const filteredIssues = await issueRepository.searchBasedIssueRepo(query);

            // Rendering the project page with filtered issues
            res.render("projectPage", { project: project, issues: filteredIssues, projectId: id });

        } catch (err) {
            // Handling and logging any errors that occur
            console.log(err);
            throw new Error(err);
        }
    }
}
