import mongoose from "mongoose";

// Define the issue schema using mongoose
const issueSchema = new mongoose.Schema({
  // Reference to the associated project using ObjectId
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
    required: true,
  },
  // Title of the bug/issue
  bugTitle: {
    type: String,
    required: true,
  },
  // Array of error types or categories
  bugOption: {
    type: [String],
    required: true,
  },
  // Description of the bug/issue
  bugDescription: {
    type: String,
    required: true,
  },
  // Author or creator of the bug/issue
  bugAuthor: {
    type: String,
    required: true,
  },
  // Timestamp for when the bug/issue was posted, using Date type
  postTime: {
    type: Date,
    default: Date.now, // This will store the current date and time automatically
  },
});

// Create a model based on the defined schema
const IssueModel = mongoose.model("issues", issueSchema);

// Export the IssueModel
export default IssueModel;
