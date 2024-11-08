// Importing mongoose library for MongoDB interactions
import mongoose from "mongoose";

// Defining the project schema using mongoose
const projectSchema = new mongoose.Schema({
  // Name of the project (required field)
  name: {
    type: String,
    required: true,
  },
  // Description of the project (optional field)
  description: {
    type: String,
    required: false,
  },
  // Author or creator of the project (required field)
  author: {
    type: String,
    required: true,
  },
  // Timestamp for when the project was posted, using Date for easy querying
  postTime: {
    type: Date,
    default: Date.now, // Automatically set the current date and time
  },
});

// Creating a model based on the defined schema
const ProjectModel = mongoose.model("projects", projectSchema);

// Exporting the ProjectModel
export default ProjectModel;
