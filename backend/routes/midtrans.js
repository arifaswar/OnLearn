import { Router } from "express";
import BookingController from "../controllers/bookingController";

const midtransRoutes = Router();

midtransRoutes.post("/notification", BookingController.handleNotification);

export default midtransRoutes;