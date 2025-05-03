import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    console.log(req.body, " req.body");
    const { name, email, password, confirmPassword, role } = req.body.userData;
    console.log(name, email, password, confirmPassword, role);

    if (!name || !email || !password || !confirmPassword || !role) {
      return res.json({ success: false, message: "All data mandatory," });
    }
    if (password !== confirmPassword) {
      return res.json({ success: false, message: "password not matched" });
    }

    const isEmailExist = await User.find({ email: email });
    // const isEmailExist = await User.findOne({ email: email });
    // const isEmailExist = await User.findById("67f0cc93a19f3977d3775b66");
    console.log(isEmailExist, "isEmailExist");
    if (isEmailExist?.length > 0) {
      return res.json({
        success: false,
        message: "Email already taken, please use another one.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(password, "password", hashedPassword, "hashedPassword");
    // mongodb
    const newUser = User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    console.log(newUser, "newUser");
    const responseFromDatabase = await newUser.save();
    console.log(responseFromDatabase, "responseFromDatabase");
    return res.json({ success: true, message: "Registeration Completed." });
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.json({ success: false, error: error });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are mandatory." });
    }
    const isUserExists = await User.findOne({ email: email });
    console.log(isUserExists, "isUserExists");
    if (!isUserExists) {
      return res.json({ success: false, message: "Email is wrong." });
    }
    console.log(
      password,
      "req.body.password",
      isUserExists.password,
      "isUserExists.password"
    );
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExists.password
    );
    console.log(isPasswordCorrect, "isPasswordCorrect");
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Password is wrong." });
    }
    const jwtToken = jwt.sign(
      { userId: isUserExists._id },
      process.env.TOKENSECRETKEY
    );
    console.log(jwtToken, "jwtToken");

    res.cookie("token", jwtToken);

    return res.json({
      success: true,
      message: "Login successfull.",
      userData: {
        user: {
          userId: isUserExists._id,
          name: isUserExists.name,
          phone: isUserExists.phone,
          role: isUserExists.role,
        },
        token: jwtToken,
      },
    });
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.json({ success: false, error: error });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body; // string -> data , userId
    if (!token) {
      return res.json({ success: false });
    }
    const tokenData = jwt.verify(token, process.env.TOKENSECRETKEY);
    if (!tokenData) {
      return res.json({ success: false });
    }
    const isUserExists = await User.findById(tokenData.userId);
    if (!isUserExists) {
      return res.json({ success: false });
    }
    return res.json({
      success: true,
      userData: {
        user: {
          userId: isUserExists._id,
          name: isUserExists.name,
          phone: isUserExists.phone,
          role: isUserExists.role,
        },
      },
    });
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.json({ success: false, error: error });
  }
};
