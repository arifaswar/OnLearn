import { comparePassword, hashPassword } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/jwt.js";
import Student from "../models/student.js";
class StudentController {
  static async studentRegister(req, res) {
    try {
      //   res.json("student registry");
      const {
        name,
        email,
        password,
        phone,
        school,
        address,
        latitude,
        longitude,
      } = req.body;
      if (!latitude || !longitude) {
        return res.status(400).json({
          message: "Latitude dan Longitude diperlukan untuk lokasi.",
        });
      }
      const hashedPassword = hashPassword(password);

      const newStudent = await Student.create({
        name,
        email,
        password: hashedPassword,
        phone,
        school,
        address,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      });
      res.status(201).json({
        message: "Success ad new Student",
        newStudent: newStudent,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async studentLogin(req, res) {
    try {
      const { email, password, latitude, longitude } = req.body;
      const student = await Student.findOne({ email });
      // console.log(student);
      const isValidPassword = comparePassword(password, student.password);
      // console.log(isValidPassword);
      const access_token = signToken(student.id, student.email);
      res.status(201).json({
        message: "Success login",
        access_token: access_token,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getProfile(req, res) {
    try {
      // res.json("get me")
      // console.log(req.student);
      res.status(200).json({ student: req.student });
    } catch (error) {
      console.log(error);
    }
  }
}

export default StudentController;
