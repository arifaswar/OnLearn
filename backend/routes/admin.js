import { Router } from 'express';
import AdminController from '../controllers/adminController.js';

const adminRoutes = Router();

adminRoutes.post('/register', AdminController.adminRegister);
adminRoutes.post('/login', AdminController.adminLogin)

export default adminRoutes;