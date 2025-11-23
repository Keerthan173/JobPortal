import mysql from "mysql2/promise";

let connectDB;

if (!global._connectDB) {
  global._connectDB = mysql.createPool({
    host: "127.0.0.1",
    user: "sampath",
    password: "Password@123",
    database: "jobportal",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 5,
    idleTimeout: 60000,
    queueLimit: 0,
  });
}

connectDB = global._connectDB;

export default connectDB;
