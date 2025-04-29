import { Router } from "express";
import AuthRoutes from "./auth.routes.js";
import ProductRoutes from "./product.routes.js";
import UserRoutes from "./user.routes.js";
import OperatorsRoutes from "./operator.routes.js";
import AgpRoutes from "./agp.routes.js";

const AllRoutes = Router();

AllRoutes.use("/auth", AuthRoutes);
AllRoutes.use("/product", ProductRoutes);
AllRoutes.use("/user", UserRoutes);
AllRoutes.use("/operators", OperatorsRoutes);
AllRoutes.use("/agp", AgpRoutes);

export default AllRoutes;

// /api/v1

//             /auth

//                         /Login
//                         /register

//             /product
//                         /create-product
//                         /vie-product

//             /user
