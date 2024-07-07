// routes/routes.js
const express = require("express");
const router = express.Router();
const axios = require("axios"); // Ensure axios is imported

// GET route to render login form
router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

// POST route to handle login form submission
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Make a POST request to your API endpoint for login
        const apiResponse = await axios.post("http://api.example.com/login", {
            email,
            password
        });

        // Assuming your API responds with a token or user object upon successful login
        const { token, user } = apiResponse.data;

        // Store user information or token in session (replace with your actual implementation)
        req.session.user = user;
        req.session.token = token;

        // Set a success message
        req.session.message = "Login successful";

        // Redirect to dashboard or authenticated route
        res.redirect("/dashboard");
    } catch (error) {
        // Handle API request error or authentication failure
        console.error("Error logging in:", error.message);
        // Set an error message
        req.session.message = "Login failed. Please try again.";
        // Render the login form with the error message
        res.render("login", { title: "Login", message: req.session.message });
    }
});

module.exports = router;
