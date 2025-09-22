import { comparePassword, hashPassword } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/jwt.js";
import Teacher from "../models/Teacher.js";

class TeacherController {
    static async teacherRegister(req, res) {
        try {
            // res.json("teacher register")
            const {name, email, password, bio, subject, latitude, longitude } = req.body;
            const hashedPassword = hashPassword(password);

            const newTeacher = await Teacher.create({
                name, email, password: hashedPassword, bio, subject, latitude, longitude
            });

            res.status(201).json({
                message: "success add new Teacher",
                newTeacher: newTeacher
            })
        } catch (error) {
            console.log(error);
        }
    };

    static async teacherLogin(req, res) {
        try {
            const {email, password, latitude, longitude} = req.body;
            const teacher = await Teacher.findOne({email});
            // console.log(teacher);
            const isValidPassword = comparePassword(password, teacher.password);
            // console.log(isValidPassword);
            const access_token = signToken(teacher.id, teacher.email)
            
            res.status(200).json({
                message: 'Success login',
                access_token: access_token
            })
            
        } catch (error) {
            console.log(error);
        }
    };

    static async teacherProfile(req, res) {
        try {
            res.status(200).json({
                message: "Success get my profile",
                teacher: req.teacher})
        } catch (error) {
            console.log(error);
        }
    }
};

export default TeacherController;