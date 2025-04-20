import { Router } from "express";
import {
  AddProduct,
  AddedProducts,
  AllProducts,
  SingleProductData,
} from "../controllers/product.controllers.js";

const ProductRoutes = Router();

ProductRoutes.post("/add-product", AddProduct); // seller
ProductRoutes.post("/added-products", AddedProducts); // seller
ProductRoutes.get("/all-products", AllProducts); // user
ProductRoutes.post("/single-product-data", SingleProductData); // user

export default ProductRoutes;
