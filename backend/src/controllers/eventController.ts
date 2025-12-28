import { Request, Response } from "express";
import { db } from "../config/db";

export const createEvent = (req: Request, res: Response) => {
  const {
    organizer_id,
    name,
    description,
    venue,
    date_time,
    category,
    capacity,
  } = req.body;

  // Basic validation
  if (!organizer_id || !name || !venue || !date_time || !capacity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (capacity <= 0) {
    return res
      .status(400)
      .json({ message: "Capacity must be greater than zero" });
  }

  const query = `
    INSERT INTO events
    (organizer_id, name, description, venue, date_time, category, capacity)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [organizer_id, name, description, venue, date_time, category, capacity],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to create event" });
      }

      res.status(201).json({
        message: "Event created successfully",
        eventId: (result as any).insertId,
      });
    }
  );
};
export const getEvents = (req: Request, res: Response) => {
  const query = "SELECT * FROM events ORDER BY date_time ASC";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch events" });
    }

    res.json(results);
  });
};
