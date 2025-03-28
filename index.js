import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to backend server.");
});
app.get("/books", (req, res) => {
  res.send("My Books.");
});
app.get("/products", (req, res) => {
  res.send("My Products.");
});
app.get("/hello", (req, res) => {
  res.send("Hii.");
});

app.listen(8000, () => console.log("Server is running on port 8000"));
