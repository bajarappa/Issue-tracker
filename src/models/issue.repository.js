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
            console.log(err);
            throw new Error(err);
        }
    }

    // Repository method for getting issues by project ID
    async getIssuesById(projectId) {
        try {
            // Retrieving issues from the database based on the project ID
            const issues = await IssueModel.find({ projectId: projectId });
            return issues;
        } catch (err) {
            // Handling and logging any errors that occur
            console.log(err);
            throw new Error(err);
        }
    }

    // Repository method for deleting issues by project ID
    async deleteIssueByProjectId(projectId) {
        try {
            // Deleting issues from the database based on the project ID
            const result = await IssueModel.deleteMany({ projectId: projectId });

            // Logging the number of issues deleted or a message if no issues were found
            if (result.deletedCount > 0) {
                console.log(`${result.deletedCount} issues deleted for project with ID ${projectId}`);
            } else {
                console.log(`No issues found for project with ID ${projectId}`);
            }
        } catch (err) {
            // Handling and logging any errors that occur
            console.error(err);
            throw new Error(err);
        }
    }

    // Repository method for deleting a specific issue by its ID
    async detelteIssyeById(id) {
        try {
            // Deleting a specific issue from the database by its ID
            await IssueModel.findByIdAndDelete(id);
        } catch (err) {
            // Handling and logging any errors that occur
            console.log(err);
            throw new Error(err);
        }
    }

    // Repository method for filtering issues based on error types
    async filterBasedOnErrorTypesRepo(errorTypes) {
        try {
            // Filtering issues from the database based on the provided error types
            const filteredIssues = await IssueModel.find({
                bugOption: { $in: errorTypes },
            }).exec();

            // Logging the filtered issues
            console.log("Filtered Options", filteredIssues);
            return filteredIssues;
        } catch (err) {
            // Handling and logging any errors that occur
            console.error(err);
            throw new Error(err);
        }
    }

    // Repository method for searching issues based on a query
    async searchBasedIssueRepo(query) {
        try {
            // Creating a regular expression for the search query
            const regex = new RegExp(query, 'i');

            // Performing a search on both 'bugTitle' and 'bugDescription'
            const filteredIssues = await IssueModel.find({
                $or: [
                    { bugTitle: { $regex: regex } },
                    { bugDescription: { $regex: regex } }
                ]
            }).exec();

            // Returning the filtered issues
            return filteredIssues;
        } catch (err) {
            // Handling and logging any errors that occur
            console.error(err);
            throw new Error(err);
        }
    }
}
