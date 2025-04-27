import { Router } from "express";
import User from "../models/user.schema.js";

const OperatorRoutes = Router();

OperatorRoutes.get("/equalto", async (req, res) => {
  try {
    const users = await User.find({ age: { $eq: 20 } });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});

OperatorRoutes.get("/notequalto", async (req, res) => {
  try {
    const users = await User.find({ age: { $ne: 20 } });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});

OperatorRoutes.get("/greaterthan", async (req, res) => {
  try {
    const users = await User.find({ age: { $gt: 25 } });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});

OperatorRoutes.get("/greaterthanequal", async (req, res) => {
  try {
    const users = await User.find({ age: { $gte: 25 } });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});

OperatorRoutes.get("/lesserthan", async (req, res) => {
  try {
    const users = await User.find({ age: { $lt: 25 } });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});
OperatorRoutes.get("/lesserthanequal", async (req, res) => {
  try {
    const users = await User.find({ age: { $lte: 25 } });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});
OperatorRoutes.get("/in", async (req, res) => {
  try {
    const users = await User.find({ age: { $in: [25, 20] } });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});
OperatorRoutes.get("/nin", async (req, res) => {
  try {
    const users = await User.find({ age: { $nin: [25, 20] } });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});
OperatorRoutes.get("/exists", async (req, res) => {
  try {
    const users = await User.find({ nhjawd: { $exists: true } });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});
OperatorRoutes.get("/and", async (req, res) => {
  try {
    const users = await User.find({
      $and: [{ age: { $gt: 18 } }, { age: { $lte: 80 } }],
    });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});
OperatorRoutes.get("/or", async (req, res) => {
  try {
    const users = await User.find({
      $or: [{ age: { $gt: 18 } }, { age: { $lte: 80 } }],
    });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});
OperatorRoutes.get("/not", async (req, res) => {
  try {
    const users = await User.find({
      age: { $not: { $gt: 80 } },
    });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});
OperatorRoutes.get("/nor", async (req, res) => {
  try {
    const users = await User.find({
      $nor: [{ age: { $gt: 18 } }, { age: { $lte: 80 } }],
    });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});
OperatorRoutes.get("/type", async (req, res) => {
  try {
    const users = await User.find({ age: { $type: "string" } });
    return res.send(users);
  } catch (error) {
    console.log(error);
  }
});
export default OperatorRoutes;
