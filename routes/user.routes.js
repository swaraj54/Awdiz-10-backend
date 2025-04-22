import { Router } from "express";
import { addToCart, getCartProducts } from "../controllers/user.controllers.js";

const UserRoutes = Router();

UserRoutes.post("/add-to-cart", addToCart);
UserRoutes.post("/get-cart-products", getCartProducts);

export default UserRoutes;
