// Importing the 'app' instance from the 'index.js' file
import app from './index.js';

// Importing the 'connectToMongoose' function from the 'connectToMongo.js' file
import { connectToMongoose } from './src/config/connectToMongo.js';

// Setting up the server to listen on port 3000
app.listen(3000, () => {
    // Connecting to the MongoDB database using the imported function
    connectToMongoose();

    // Logging a message indicating that the app is now listening on port 3000
    console.log("App is listening at port 3000");
});
