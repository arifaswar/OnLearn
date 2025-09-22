import { Router } from "express"
import StudentController from "../controllers/studentController.js";

const studentRoutes = Router();

studentRoutes.post("/register", StudentController.studentRegister);
studentRoutes.post("/login", StudentController.studentLogin)

export default studentRoutes