import { Router } from "express";
import {
  addToCart,
  getCartProducts,
  checkout,
  getOrderHistory,
} from "../controllers/user.controllers.js";

const UserRoutes = Router();

UserRoutes.post("/add-to-cart", addToCart);
UserRoutes.post("/get-cart-products", getCartProducts);
UserRoutes.post("/checkout", checkout);
UserRoutes.post("/get-order-history", getOrderHistory);

export default UserRoutes;
