import Schedule from "../models/Schedule.js";
import Teacher from "../models/Teacher.js";
import { v4 as uuidv4 } from 'uuid';

class ScheduleController {
  static async createSchedule(req, res) {
    try {
      const { weekStart, slots } = req.body;
      const teacherId = req.teacher.id;
      // console.log(teacherId, ">>>> teacherId");
      const teacher = await Teacher.findById(teacherId);
      // console.log(teacher);

      if (!teacher)
        return res.status(404).json({ message: "Teacher not found" });

      // generate slot dengan slotId unik
      const slotsWithId = slots.map((slot, idx) => ({
        id: idx + 1,
        slotId: uuidv4(),
        ...slot,
      }));

      const newSchedule = await Schedule.create({
        teacher: teacherId,
        weekStart,
        slots: slotsWithId
      });

      res.status(201).json({
        message: "success create schedule",
        schedule: newSchedule
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export default ScheduleController;
