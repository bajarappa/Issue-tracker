// Importing necessary modules and libraries
import express from 'express';
import path from 'path';
import ejsLayout from 'express-ejs-layouts';

// Importing controllers for handling project and issue-related actions
import ProjectController from './src/controller/project.controller.js';
import IssueController from './src/controller/issueController.js';

// Creating instances of controllers
const projectController = new ProjectController();
const issueController = new IssueController();

// Creating an Express application
const app = express();

// Serving static files from the 'public' directory
app.use(express.static('public'));

// Using EJS layout middleware for rendering views
app.use(ejsLayout);

// Parsing JSON and URL-encoded data in requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting the view engine as EJS
app.set('view engine', 'ejs');

// Setting the views directory
app.set('views', path.join(path.resolve(), 'src', 'views'));

// Routes for handling project-related actions
app.get('/projects/delete/:id', projectController.deleteProjectController);
app.get('/projects/:projectId/delete/:id', projectController.deleteIssueController);
app.post('/projects/:id/filter', issueController.filterBasedOnErrorTypes);
app.post('/projects/:id/search', issueController.searchIssueController);
app.get('/projects/:id', projectController.showProjectController);
app.post('/newProject', projectController.addNewProjectContrller);

// Routes for handling issue-related actions
app.post('/newIssue', issueController.addNewIssueController);

// Default route for the home page
app.get('/', projectController.issueHomePage);

// Exporting the Express application instance
export default app;
