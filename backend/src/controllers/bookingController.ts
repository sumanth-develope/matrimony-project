import { Request, Response } from "express";
import { db } from "../config/db";

export const bookTickets = (req: Request, res: Response) => {
  const { event_id, attendee_id, tickets_booked, total_price } = req.body;

  // Basic validation
  if (!event_id || !attendee_id || !tickets_booked || !total_price) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (tickets_booked <= 0) {
    return res
      .status(400)
      .json({ message: "Tickets must be greater than zero" });
  }

  // Step 1: Get event capacity
  const eventQuery = "SELECT capacity FROM events WHERE id = ?";

  db.query(eventQuery, [event_id], (err, eventResult: any) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch event" });
    }

    if (eventResult.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    const eventCapacity = eventResult[0].capacity;

    // Step 2: Get total booked tickets
    const bookedQuery =
      "SELECT SUM(tickets_booked) AS totalBooked FROM bookings WHERE event_id = ?";

    db.query(bookedQuery, [event_id], (err, bookedResult: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to check bookings" });
      }

      const totalBooked = bookedResult[0].totalBooked || 0;
      const availableSeats = eventCapacity - totalBooked;

      if (tickets_booked > availableSeats) {
        return res.status(400).json({
          message: "Not enough seats available",
          availableSeats,
        });
      }

      // Step 3: Insert booking
      const insertQuery = `
        INSERT INTO bookings
        (event_id, attendee_id, tickets_booked, total_price)
        VALUES (?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [event_id, attendee_id, tickets_booked, total_price],
        (err, result: any) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Booking failed" });
          }

          res.status(201).json({
            message: "Tickets booked successfully",
            bookingId: result.insertId,
          });
        }
      );
    });
  });
};
