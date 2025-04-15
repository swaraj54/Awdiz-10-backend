import { Router } from "express";
import { AddProduct } from "../controllers/product.controllers.js";

const ProductRoutes = Router();

ProductRoutes.post('/add-product', AddProduct)

export default ProductRoutes;
