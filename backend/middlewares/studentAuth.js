import { verifyToken } from "../helpers/jwt.js";
import Student from "../models/student.js";

const studentAuth = async (req, res, next) => {
  try {
    const bearer_token = req.headers.authorization;
    // console.log(bearer_token);
    if (!bearer_token) {
      return res.status(401).json({ message: "No token provided" });
    };

    const token = bearer_token.split(" ")[1];
    // console.log(token);
    
    const payload = verifyToken(token);
    // console.log(payload, "payload");
    

    const student = await Student.findById(payload);
    // console.log(student);
    req.student = student;

    next();
    
  } catch (error) {
    console.log(error);
  }
};

export default studentAuth;
