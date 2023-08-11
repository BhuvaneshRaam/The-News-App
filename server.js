require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
require("dotenv").config(); // Load environment variables from .env file
app.use(express.static("public"));

// Define an API route to fetch news data
app.get("/api/news", async (req, res) => {
  try {
    const query = req.query.q || ""; // Get the search query from the request query parameters

    // Log the received query
    console.log("Received query:", query);

    // Fetch news data based on the search query
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`
    );

    // Process the fetched data (assuming the data is in response.data)
    const newsData = response.data.articles;

    // Log the processed news data
    console.log("Processed news data:", newsData);

    // Send the processed data back to the client as JSON
    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching news data." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
