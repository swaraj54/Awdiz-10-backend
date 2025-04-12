import { Router } from "express";
import {
  Login,
  Register,
  getCurrentUser,
} from "../controllers/auth.controllers.js";

const AuthRoutes = Router();

AuthRoutes.post("/register", Register);
AuthRoutes.post("/login", Login);
AuthRoutes.post("/get-current-user", getCurrentUser);

export default AuthRoutes;
