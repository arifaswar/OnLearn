import { comparePassword, hashPassword } from '../helpers/bcrypt.js';
import { signToken } from '../helpers/jwt.js';
import Admin from '../models/Admin.js';
import Student from '../models/student.js';

class AdminController {
  static async adminRegister(req, res) {
    try {
      // res.json('register')
      const { name, email, password } = req.body;
        
      const user = await Admin.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = hashPassword(password);
      const newUser = await Admin.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(201).json({
        message: "Success post new Admin",
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async adminLogin(req, res) {
    try {
      // res.json('login')
      const { email, password} = req.body;
      const user = await Admin.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const validPassword = comparePassword(password, user.password);
      // console.log(validPassword);

      if (!validPassword) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const access_token = signToken({ id: user.id });
      res.status(200).json({
        message: "Success Login",
        access_token,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getStudent(req, res) {
    try {
      // res.json('getUser')
      const students = await Student.find().select("-password");
      res.status(200).json({
        message: "All Student",
        students,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      // console.log(id);
      const student = await Student.findOne({userId: id}).select('-password');
    //   console.log(user);
      if (!student) {
        return res.status(404).json({ message: "User not found" });
      };

      res.status(200).json({
        student
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export default AdminController
