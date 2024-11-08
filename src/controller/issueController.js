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
      // Validate request data
      const { projectId, bugTitle, bugOption, bugDescription, bugAuthor } =
        req.body;
      if (
        !projectId ||
        !bugTitle ||
        !bugOption ||
        !bugDescription ||
        !bugAuthor
      ) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Adding a new issue using the issue repository
      const newIssue = await issueRepository.addNewIssueRepo(req.body);

      // Redirecting to the project page after adding the issue
      return res.redirect(`/projects/${projectId}`);
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error in addNewIssueController:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Controller method for filtering issues based on error types
  async filterBasedOnErrorTypes(req, res) {
    try {
      const { bugOption, projectId } = req.body;

      // Validate the request body
      if (!bugOption || !projectId) {
        return res
          .status(400)
          .json({ error: "Project ID and Bug Options are required." });
      }

      // Retrieving project information and filtered issues from repositories
      const project = await projectRepository.getProjectById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found." });
      }

      const filteredIssues = await issueRepository.filterBasedOnErrorTypesRepo(
        bugOption
      );

      // Render the project page with filtered issues
      return res.render("projectPage", {
        project,
        issues: filteredIssues,
        projectId,
      });
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error in filterBasedOnErrorTypes:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Controller method for searching issues
  async searchIssueController(req, res) {
    try {
      const { query, projectId } = req.body;

      // Validate the request body
      if (!query || !projectId) {
        return res
          .status(400)
          .json({ error: "Query and Project ID are required." });
      }

      // Retrieving project information and filtered issues from repositories
      const project = await projectRepository.getProjectById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found." });
      }

      const filteredIssues = await issueRepository.searchBasedIssueRepo(query);

      // Render the project page with filtered issues
      return res.render("projectPage", {
        project,
        issues: filteredIssues,
        projectId,
      });
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error in searchIssueController:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
