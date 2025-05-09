import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";
export const middlewareForCookieToken = async (req, res, next) => {
  console.log(req.cookies, " req.cookie");
  const token = req.cookies.token;
  if (!token) {
    return res.json({ success: false, message: "Toke not found." });
  }
  const tokenData = jwt.verify(token, process.env.TOKENSECRETKEY);
  if (!tokenData) {
    return res.json({
      success: false,
      message: "Token not valid, Please login agaim.",
    });
  }
  const isUserExists = await User.findById(tokenData.userId);
  if (!isUserExists) {
    return res.json({ success: false, message: "User not exists." });
  }
  next();
};
