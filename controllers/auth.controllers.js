import User from "../models/user.schema.js";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  try {
    console.log(req.body, " req.body");
    const { name, email, password, confirmPassword } = req.body.userData;
    console.log(name, email, password, confirmPassword);

    if (!name || !email || !password || !confirmPassword) {
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
    });
    console.log(newUser, "newUser");
    const responseFromDatabase = await newUser.save();
    console.log(responseFromDatabase, "responseFromDatabase");
    return res.json({ success: true, message: "Registrerationc omplted." });
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
    return res.json({
      success: true,
      message: "Login successfull.",
      userData: {
        user: { name: isUserExists.name, phone: isUserExists.phone },
        token: "abc",
      },
    });
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.json({ success: false, error: error });
  }
};
