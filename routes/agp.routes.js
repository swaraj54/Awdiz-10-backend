import { Router } from "express";
import User from "../models/user.schema.js";
import Product from "../models/product.schema.js";
import Cart from "../models/cart.schema.js";

const AgpRoutes = Router();

AgpRoutes.get("/matching-grouping", async (req, res) => {
  try {
    const products = await Product.aggregate([
      //   { $match: { category: "clothing", price: { $gt: 500 } } },
      { $match: { price: { $gt: 500 } } },
      {
        $group: {
          _id: "$category",
          totalQuantity: { $sum: "$quantity" },
          totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);
    return res.json({ products: products, statusCode: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ statusCode: 500, succes: false, status: "false" });
  }
});

AgpRoutes.get("/unwinding-projecting", async (req, res) => {
  try {
    //67f21d72866be8e57b1b860a
    const products = await Cart.aggregate([
      {
        $unwind: "$products",
      },
      {
        $project: { userId: 1, products: 1, _id: 0 },
      },
    ]);
    return res.send(products);
  } catch (error) {
    console.log(error);
    return res.json({ statusCode: 500, succes: false });
  }
});

export default AgpRoutes;
