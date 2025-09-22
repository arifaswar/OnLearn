import { verifyToken } from "../helpers/jwt.js";
import Admin from "../models/Admin.js";

const adminAuth = async (req, res, next) => {
    try {
      // console.log(req.headers.authorization);
      const bearer_token = req.headers.authorization;
      // console.log(bearer_token);
      

      if(!bearer_token) {
        return res.status(401).json({message: "JsonWebToken error"})
      };

      const token = bearer_token.split(" ")[1];
      // console.log(token);

      const payload = verifyToken(token);
      console.log(payload);
      const admin = await Admin.findById(payload.id);
      // console.log(admin);

      req.admin = admin;
      
      if (admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };

export default adminAuth;
