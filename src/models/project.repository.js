// Importing ProjectModel, ObjectId, and mongoose library for MongoDB interactions
import ProjectModel from "./project.schema.js";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";

// Exporting the ProjectRepository class
export default class ProjectRepository {
  // Repository method for adding a new project
  async addNewProjectRepository(project) {
    try {
      // Creating a new ProjectModel instance and saving it to the database
      const newProject = new ProjectModel(project);
      await newProject.save();
      return newProject;
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error adding new project:", err);
      throw new Error("Failed to add new project");
    }
  }

  // Repository method for getting all projects
  async getAllProjects() {
    try {
      // Retrieving all projects from the database
      const allProjects = await ProjectModel.find();

      // Logging when no projects are found
      if (allProjects.length === 0) {
        console.log("No projects found.");
      }

      return allProjects;
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error retrieving projects:", err);
      throw new Error("Failed to retrieve projects");
    }
  }

  // Repository method for getting a project by its ID
  async getProjectById(id) {
    try {
      // Converting the provided ID to a mongoose ObjectId
      const newId = new mongoose.Types.ObjectId(id);

      // Retrieving a project from the database by its ID
      const project = await ProjectModel.findById(newId);

      // Handling case when the project doesn't exist
      if (!project) {
        console.log(`No project found with ID ${id}`);
        throw new Error("Project not found");
      }

      return project;
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error retrieving project by ID:", err);
      throw new Error("Failed to retrieve project by ID");
    }
  }

  // Repository method for deleting a project by its ID
  async deleteProjectRepo(id) {
    try {
      // Deleting a project from the database by its ID
      const deletedProject = await ProjectModel.findByIdAndDelete(id);

      // Handling the case when the project doesn't exist
      if (!deletedProject) {
        console.log(`No project found with ID ${id}`);
        throw new Error("Project not found");
      }

      // Logging a message when a project is successfully deleted
      console.log(`Project with ID ${id} has been deleted`);
      return deletedProject;
    } catch (err) {
      // Handling and logging any errors that occur
      console.error("Error deleting project:", err);
      throw new Error("Failed to delete project");
    }
  }
}
