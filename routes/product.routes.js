import { Router } from "express";
import {
  AddProduct,
  AddedProducts,
  AllProducts,
  SingleProductData,
} from "../controllers/product.controllers.js";
import { middlewareForCookieToken } from "../services/token.service.js";

const ProductRoutes = Router();

ProductRoutes.post("/add-product", middlewareForCookieToken, AddProduct); // seller
ProductRoutes.post("/added-products", middlewareForCookieToken, AddedProducts); // seller
ProductRoutes.get("/all-products", AllProducts); // user
ProductRoutes.post("/single-product-data", SingleProductData); // user

export default ProductRoutes;
