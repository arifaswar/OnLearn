import { Router } from 'express';
import adminRoutes from './admin.js';
import studentRoutes from './students.js';
import teacherRoutes from './teachers.js';
import midtransRoutes from './midtrans.js';

const router = Router();

router.use("/api/admin", adminRoutes);
router.use("/api/students", studentRoutes);
router.use("/api/teachers", teacherRoutes);
router.use("/api/midtrans", midtransRoutes)

export default router;