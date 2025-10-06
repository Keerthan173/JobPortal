import mysql from "mysql2/promise";

const connectDB = mysql.createPool({
  host: "127.0.0.1",
  user: "sampath",
  password: "Password@123",
  database: "jobportal",
});

export default connectDB;
