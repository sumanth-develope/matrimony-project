import mysql from "mysql2";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Mysql@2025",
  database: "event_planner_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
