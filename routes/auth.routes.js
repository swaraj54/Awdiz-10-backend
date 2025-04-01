import { Router } from "express";
import { Login, Register } from "../controllers/auth.controllers.js";

const AuthRoutes = Router();

AuthRoutes.post("/register", Register);
AuthRoutes.post('/login', Login)

export default AuthRoutes;
