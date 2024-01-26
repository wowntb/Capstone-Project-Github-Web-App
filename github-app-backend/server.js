const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get("/api/users/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    if (!response.data) {
      throw new Error("User not found");
    }

    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
