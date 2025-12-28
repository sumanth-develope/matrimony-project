import { Router } from "express";
import { createEvent, getEvents } from "../controllers/eventController";

const router = Router();

// Create Event (Organizer)
router.post("/", createEvent);

// List Events (Attendee)
router.get("/", getEvents);

export default router;
