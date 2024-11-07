// Importing ProjectModel, ObjectId, and mongoose library for MongoDB interactions
import ProjectModel from "./project.schema.js";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";

// Exporting the ProjectRepository class
export default class ProjectRepository {

    // Repository method for adding a new project
    async addNewIssueRepository(issue) {
        try {
            // Creating a new ProjectModel instance and saving it to the database
            const newIssue = new ProjectModel(issue);
            await newIssue.save();
            return newIssue;
        } catch (err) {
            // Handling and logging any errors that occur
            console.log(err);
            throw new Error(err);
        }
    }

    // Repository method for getting all projects
    async getAllProjects() {
        try {
            // Retrieving all projects from the database
            const allProjects = await ProjectModel.find();
            return allProjects;
        } catch (err) {
            // Handling and logging any errors that occur
            console.log(err);
            throw new Error(err);
        }
    }

    // Repository method for getting a project by its ID
    async getProjectById(id) {
        try {
            // Converting the provided ID to a mongoose ObjectId
            const newId = new mongoose.Types.ObjectId(id);

            // Retrieving a project from the database by its ID
            const project = await ProjectModel.findById(newId);
            return project;
        } catch (err) {
            // Handling and logging any errors that occur
            console.log(err);
            throw new Error(err);
        }
    }

    // Repository method for deleting a project by its ID
    async deletProjectRepo(id) {
        try {
            // Deleting a project from the database by its ID
            const deletedProject = await ProjectModel.findByIdAndDelete(id);

            // Handling the case when the project doesn't exist
            if (!deletedProject) {
                throw new Error('Project not found');
            }

            // Logging a message when a project is successfully deleted
            console.log(`Project with ID ${id} has been deleted`);
            return deletedProject;
        } catch (err) {
            // Handling and logging any errors that occur
            console.log(err);
            throw new Error(err);
        }
    }
}
