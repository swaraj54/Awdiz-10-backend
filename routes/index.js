import { Router } from "express";
import AuthRoutes from "./auth.routes.js";
import ProductRoutes from "./product.routes.js";
import UserRoutes from "./user.routes.js";

const AllRoutes = Router();

AllRoutes.use("/auth", AuthRoutes);
AllRoutes.use("/product", ProductRoutes);
AllRoutes.use("/user", UserRoutes);

export default AllRoutes;

// /api/v1

//             /auth

//                         /Login
//                         /register

//             /product
//                         /create-product
//                         /vie-product

//             /user
