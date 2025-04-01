import { Router } from "express";
import { CreateProduct } from "../controllers/product.controllers.js";

const ProductRoutes = Router();

ProductRoutes.post('/create-product', CreateProduct)

export default ProductRoutes;
