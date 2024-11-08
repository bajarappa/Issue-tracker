// Importing the IssueModel from the issue.schema.js file
import IssueModel from "./issue.schema.js";

// Exporting the IssueRepository class
export default class IssueRepository {
  // Repository method for adding a new issue
  async addNewIssueRepo(issue) {
    try {
      // Creating a new IssueModel instance and saving it to the database
      const newIssue = new IssueModel(issue);
      await newIssue.save();
      return newIssue;
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error adding new issue:", err);
      throw new Error("Failed to add new issue");
    }
  }

  // Repository method for getting issues by project ID
  async getIssuesByProjectId(projectId) {
    try {
      // Retrieving issues from the database based on the project ID
      const issues = await IssueModel.find({ projectId: projectId });

      // Handling the case where no issues are found
      if (issues.length === 0) {
        console.log(`No issues found for project with ID ${projectId}`);
      }

      return issues;
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error retrieving issues:", err);
      throw new Error("Failed to retrieve issues");
    }
  }

  // Repository method for deleting issues by project ID
  async deleteIssuesByProjectId(projectId) {
    try {
      // Deleting issues from the database based on the project ID
      const result = await IssueModel.deleteMany({ projectId: projectId });

      // Logging the number of issues deleted or a message if no issues were found
      if (result.deletedCount > 0) {
        console.log(
          `${result.deletedCount} issues deleted for project with ID ${projectId}`
        );
      } else {
        console.log(`No issues found for project with ID ${projectId}`);
      }
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error deleting issues by project ID:", err);
      throw new Error("Failed to delete issues by project ID");
    }
  }

  // Repository method for deleting a specific issue by its ID
  async deleteIssueById(id) {
    try {
      // Deleting a specific issue from the database by its ID
      const deletedIssue = await IssueModel.findByIdAndDelete(id);

      if (!deletedIssue) {
        console.log(`No issue found with ID ${id}`);
      }
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error deleting issue by ID:", err);
      throw new Error("Failed to delete issue");
    }
  }

  // Repository method for filtering issues based on error types
  async filterIssuesByErrorTypes(errorTypes) {
    try {
      // Filtering issues from the database based on the provided error types
      const filteredIssues = await IssueModel.find({
        bugOption: { $in: errorTypes },
      }).exec();

      return filteredIssues; // Directly return the result without logging
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error filtering issues by error types:", err);
      throw new Error("Failed to filter issues by error types");
    }
  }

  // Repository method for searching issues based on a query
  async searchIssues(query) {
    try {
      // Creating a regular expression for the search query
      const regex = new RegExp(query, "i");

      // Performing a search on both 'bugTitle' and 'bugDescription'
      const filteredIssues = await IssueModel.find({
        $or: [
          { bugTitle: { $regex: regex } },
          { bugDescription: { $regex: regex } },
        ],
      }).exec();

      // Return an empty array if no issues are found
      if (filteredIssues.length === 0) {
        console.log("No issues found matching the query:", query);
      }

      return filteredIssues;
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error searching issues:", err);
      throw new Error("Failed to search issues");
    }
  }
}
