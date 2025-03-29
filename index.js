import express from "express";

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//   if (req.body.email) {
//     next();
//   } else {
//     return res.send("Email not found,");
//   }
// });

app.get("/", (req, res) => {
  return res.send("Welcome to backend server.");
});
app.get("/books", (req, res) => {
  return res.send("My Books.");
});
app.get("/products", (req, res) => {
  return res.send("My Products.");
});
app.get("/hello", (req, res) => {
  return res.send("Hii.");
});

app.post("/register", (req, res) => {
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

    return res.send("Registrerationc omplted.");
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.send(error);
  }
});

app.listen(8000, () => console.log("Server is running on port 8000"));
