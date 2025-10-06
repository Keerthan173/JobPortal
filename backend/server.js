// Importing pacakages
const express = require("express");       // Web framework for Node.js
const mysql = require("mysql2");         // Node.js library to connect and run queries on MySQL database
const cors = require("cors");     // Enables Cross-Origin Resource Sharing, so frontend (Next.js) running on port 3000 can talk to backend (port 5000)

require("dotenv").config();       // Loads environment variables

const bcrypt = require("bcryptjs");       // Hash passwords before saving to DB
const jwt = require("jsonwebtoken");      // Create tokens when users log in (so they stay logged in securely)



// Creating Express App
const app = express();      // Creates an Express server instance
app.use(cors());
app.use(express.json());    // Makes backend understand JSON data sent from frontend
// app.use(): “Tell the Express app to use this middleware function for all requests."




// MySQL Database Connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "sampath",
  password:  "Password@123",
  database: "jobportal",
});
db.connect((err) => {
  if(err) throw err;
  console.log("MySQL connected successfully!");
})




// Test Route
app.get("/", (req,res)=>{     // Creates a GET API at http://localhost:5000/
  res.send("Backend is running!");
});





// User Signup Route
app.post("/signup", async (req, res) => {             // async → lets us use await
  const {name, email, password, role} = req.body;

  try{
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);     // await → pauses execution until Promise (like bcrypt.hash) is done

    // Insert into DB
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, role || "candidate"], (err, result) => {
      if(err){
        console.error("Error inserting the user:", err);
        return res.status(500).json({message: "Database error - " + err.message});
      }
      res.status(201).json({message: "User registered successfully!"});
    });
    /*
      - [name, email, hashedPassword, role] replaces the ? placeholders in order.
      - 500 Internal Server Error.
      - 201 Created.
    */
  } catch(err){
    res.status(500).json({message: "Error hashing password."});
  }
});





// User Login Route
app.post("/login", (req, res) => {
  const {email, password} = req.body;

  const sql = "SELECT * FROM users WHERE email=?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if(results.length==0){
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];

    try{
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return res.status(401).json({message: "Invalid password"});
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role},    // payload (data inside the token)
        process.env.JWT_SECRET || "secret123",    // secret key for signing
        { expiresIn: "1h"}                    // token expiry time
      );

      res.json({
        message: "Login successful!",
        token, // frontend will store this
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Login error." });
    }
  });
});



// Protected Route example
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>

  if(!token){
    return res.status(401).json({message: "No token provided"});
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET || "secret123", (err, decoded) => {
    if(err) return res.status(403).json({message: "Invalid token"});

    res.json({message: "Access granted", user: decoded});
  });
});





// Get User Profile Route
app.get("/profile/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "SELECT id, name, email, role FROM users WHERE id=?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching profile:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(results[0]);
  });
});



// Update User Profile Route
app.put("/profile/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(sql, [name, email, userId], (err, result) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  });
});




// Post a new Job
app.post("/jobs", (req, res) => {
  const { title, description, company, location } = req.body;

  const sql = "INSERT INTO jobs (title, description, company, location) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, company, location], (err, result) => {
    if (err) {
      console.error("Error posting job:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "Job posted successfully", jobId: result.insertId });
  });
});



// Get all jobs
app.get("/jobs", (req, res) => {
  const sql = "SELECT * FROM jobs ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json(results);
  });
});



// Delete User Route
app.delete("/profile/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id=?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Account deleted successfully" });
  });
});



// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on the port ${PORT}`));
/*
  Starts the Express server.
  Tells it to listen for incoming requests (HTTP GET/POST etc.).
*/