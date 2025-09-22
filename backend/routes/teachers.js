import { Router } from "express";
import TeacherController from "../controllers/teacherController.js";
import teacherAuth from "../middlewares/teacherAuth.js";

const teacherRoutes = Router();

teacherRoutes.post("/register", TeacherController.teacherRegister);
teacherRoutes.post("/login", TeacherController.teacherLogin);
teacherRoutes.get("/me",teacherAuth, TeacherController.teacherProfile)

export default teacherRoutes;