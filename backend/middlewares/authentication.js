const { verifyToken } = require("../helpers/jwt");
const User = require("../models/User");

const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      // console.log(req.headers.authorization);
      const bearer_token = req.headers.authorization;

      if(!bearer_token) {
        return res.status(401).json({message: "JsonWebToken error"})
      };

      const token = bearer_token.split(" ")[1];
      // console.log(token);

      const payload = verifyToken(token);
      // console.log(payload);
      const user = await User.findById(payload.id);
      // console.log(user);

      req.user = user;
      console.log();
      
      
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };
};

module.exports = auth;
