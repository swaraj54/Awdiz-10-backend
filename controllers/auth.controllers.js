export const Register = (req, res) => {
  try {
    // console.log(req.body.name, req.body.email);
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);

    if (!name || !email || !password || !confirmPassword) {
      return res.send("All data mandatory,");
    }
    if (password !== confirmPassword) {
      return res.send("password not matched");
    }
    // mongodb 
    return res.send("Registrerationc omplted.");
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
