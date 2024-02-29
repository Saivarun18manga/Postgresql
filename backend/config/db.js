import pkg from "pg";
import dotenv from "dotenv";
import users from "../data.js";

dotenv.config();

const { Client } = pkg;
const client = new Client({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

const connectDB = async () => {
  client
    .connect()
    .then(() => {
      console.log("Connected to PostgreSQL database");
    })
    .catch((err) => {
      console.error("Error connecting to PostgreSQL database", err);
    });

  // CREATE TABLE users (
  //     id SERIAL PRIMARY KEY,
  //     customerName VARCHAR(255) NOT NULL,
  //     age INTEGER,
  //     phone VARCHAR(255),
  //     location VARCHAR(255),
  //     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  //   );

  //   try {
  //     for (let i = 0; i < users.length; i++) {
  //       const { customerName, age, phone, location } = users[i];
  //       await client.query(
  //         "INSERT INTO users (customerName, age, phone, location, createdAt) VALUES ($1, $2, $3, $4, NOW())",
  //         [customerName, age, phone, location]
  //       );
  //     }
  //     client.end();
  //     console.log("Dummy users inserted successfully");
  //   } catch (err) {
  //     console.error("Error inserting dummy users", err);
  //   }
};
export { client };
export default connectDB;
