import { Router } from "express";
import TeacherController from "../controllers/teacherController.js";
import teacherAuth from "../middlewares/teacherAuth.js";
import ScheduleController from "../controllers/scheduleController.js";

const teacherRoutes = Router();

teacherRoutes.post("/register", TeacherController.teacherRegister);
teacherRoutes.post("/login", TeacherController.teacherLogin);
teacherRoutes.get("/me",teacherAuth, TeacherController.teacherProfile);
teacherRoutes.post("/schedules", teacherAuth, ScheduleController.createSchedule)

export default teacherRoutes;