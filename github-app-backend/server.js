const express = require("express");
const axios = require("axios");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 5000;

// Use Helmet middleware to enhance security.
app.use(helmet());

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
