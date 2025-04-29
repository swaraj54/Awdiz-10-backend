import { Router } from "express";
import User from "../models/user.schema.js";
import Product from "../models/product.schema.js";

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
    return res.send(products);
  } catch (error) {
    console.log(error);
  }
});

export default AgpRoutes;
