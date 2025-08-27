// Importing pacakages
const express = require("express");       // Web framework for Node.js
const mysql = require("mysql2");         // Node.js library to connect and run queries on MySQL database
const cors = require("cors");     // Enables Cross-Origin Resource Sharing, so frontend (Next.js) running on port 3000 can talk to backend (port 5000)

require("dotenv").config();       // Loads environment variables

const bcrypt = require("bcryptjs");       // Hash passwords before saving to DB
const jwt = require("jsonwebtoken");      // Create tokens when users log in (so they stay logged in securely)



// Creating Express App
const app = express();      // Creates an Express server instance
app.use(cors());            // Allows frontend and backend (different ports) to communicate
app.use(express.json());    // Makes backend understand JSON data sent from frontend




// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "jobportal",
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
  const {name, email, password} = req.body;

  try{
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);     // await → pauses execution until Promise (like bcrypt.hash) is done

    // Insert into DB
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if(err){
        console.error("Error inserting the user:", err);
        return res.status(500).json({message: "Database error."});
      }
      res.status(201).json({message: "User registered successfully!"});
    });
    /*
      - [name, email, hasedPassword] replaces the ? placeholders in order.
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

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({message: "Invalid password"});
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email},    // payload (data inside the token)
      process.env.JWT_SECRET || "secret123",    // secret key for signing
      { expiresIn: "1h"}                    // token expiry time
    );

    res.status(200).json({ message: "Login successful", user: results, token });
  });
});





// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on the port ${PORT}`));
/*
  Starts the Express server.
  Tells it to listen for incoming requests (HTTP GET/POST etc.).
*/
