import mongoose, { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    price: { type: Number },
  },
  { timestamps: true }
);

const Order = model("Orders", orderSchema);

export default Order;
