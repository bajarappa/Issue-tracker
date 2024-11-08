// Importing the 'app' instance from the 'index.js' file
import app from "./index.js";

// Importing the 'connectToMongoose' function from the 'connectToMongo.js' file
import { connectToMongoose } from "./src/config/connectToMongo.js";

// Define the port, using an environment variable with a fallback to 3000
const PORT = process.env.PORT || 3000;

// Function to start the server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectToMongoose();

    // Start the server only after MongoDB connection is successful
    app.listen(PORT, () => {
      console.log(`App is listening at port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

// Start the server
startServer();
