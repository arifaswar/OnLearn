import { verifyToken } from "../helpers/jwt.js";
import Teacher from "../models/Teacher.js";

const teacherAuth = async(req, res, next) => {
    try {
        const bearer_token = req.headers.authorization;
        // console.log(bearer_token);
        const token = bearer_token.split(" ")[1];

        const payload = verifyToken(token);
        // console.log(payload);
        const teacher = await Teacher.findById(payload);
        // console.log(teacher);
        req.teacher = teacher;

        next();
        
    } catch (error) {
        console.log(error);
        
    }
};

export default teacherAuth;