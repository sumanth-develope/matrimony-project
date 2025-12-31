import { Router } from "express";
import { bookTickets } from "../controllers/bookingController";

const router = Router();

// Book tickets (Attendee)
router.post("/", bookTickets);

export default router;
