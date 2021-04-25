const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Get port from environment variables or fallback to 3001
const PORT = process.env.PORT || 3001;

// Create and configure our express app
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); /* Allow requests from the frontend */
app.use(cookieParser()); /* Enable cookies, for use with auth state */

// Import our Routes
const testRoutes = require("./routes/test/all");
const musicAnalysisRoutes = require("./routes/music-analysis/all");

// Add our routes here
app.use("/test", testRoutes);
app.use("/music-analysis", musicAnalysisRoutes);

// Start the application
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
