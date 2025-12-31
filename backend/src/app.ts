import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./config/db";
import eventRoutes from "./routes/eventRoutes";
import bookingRoutes from "./routes/bookingRoutes";



const app = express();

app.use(cors());
app.use(express.json());
app.use("/events", eventRoutes);
app.use("/bookings", bookingRoutes);



// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Backend running");
});

// DB test route
app.get("/db-test", (req: Request, res: Response) => {
  db.query("SELECT 1", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database connection failed" });
    }
    res.json({ message: "Database connected successfully" });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
