import { Router } from "express";
import { AddProduct, AddedProducts } from "../controllers/product.controllers.js";

const ProductRoutes = Router();

ProductRoutes.post('/add-product', AddProduct)
ProductRoutes.post('/added-products', AddedProducts)

export default ProductRoutes;
