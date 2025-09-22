import { Router } from 'express';
import AdminController from '../controllers/adminController.js';
import adminAuth from '../middlewares/adminAuth.js';

const adminRoutes = Router();

adminRoutes.post('/register', AdminController.adminRegister);
adminRoutes.post('/login', AdminController.adminLogin);
adminRoutes.get('/students',adminAuth, AdminController.getStudent);
adminRoutes.get("/students/:id", AdminController.getUserById)

export default adminRoutes;