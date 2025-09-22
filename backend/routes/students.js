import { Router } from "express"
import StudentController from "../controllers/studentController.js";
import studentAuth from "../middlewares/studentAuth.js";

const studentRoutes = Router();

studentRoutes.post("/register", StudentController.studentRegister);
studentRoutes.post("/login", StudentController.studentLogin);
studentRoutes.get("/me", studentAuth, StudentController.getProfile)

export default studentRoutes