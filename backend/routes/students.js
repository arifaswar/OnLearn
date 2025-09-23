import { Router } from "express"
import StudentController from "../controllers/studentController.js";
import studentAuth from "../middlewares/studentAuth.js";
import BookingController from "../controllers/bookingController.js";

const studentRoutes = Router();

studentRoutes.post("/register", StudentController.studentRegister);
studentRoutes.post("/login", StudentController.studentLogin);
studentRoutes.get("/me", studentAuth, StudentController.getProfile);
studentRoutes.get("/search-teacher", BookingController.searchTeacher);
studentRoutes.post("/bookings-slot", studentAuth, BookingController.bookSlot);

export default studentRoutes