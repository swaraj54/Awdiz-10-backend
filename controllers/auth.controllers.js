import User from "../models/user.schema.js";

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
    // mongodb
    const newUser = User({
      name: name,
      email: email,
      password: password,
    });
    console.log(newUser, "newUser");
    const responseFromDatabase = await newUser.save();
    console.log(responseFromDatabase, "responseFromDatabase");
    return res.json({ success: true, message: "Registrerationc omplted." });
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.send(error);
  }
};

export const Login = (req, res) => {
  try {
    return res.send("Login");
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.send(error);
  }
};
