import express from "express";
import dotenv from "dotenv";
import connectDB, { client } from "./config/db.js";

dotenv.config();
const app = express();

connectDB();

// Middleware to handle JSON data
app.use(express.json());

// Define route to fetch users
app.get("/api/users", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Start the server
app.listen(process.env.PORT, async () => {
  console.log("Server started on port " + process.env.PORT);
});

// client
//   .end()
//   .then(() => {
//     console.log("Connection to PostgreSQL closed");
//   })
//   .catch((err) => {
//     console.error("Error closing connection", err);
//   });
