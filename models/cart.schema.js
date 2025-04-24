import mongoose, { model, Schema } from "mongoose";

const cartSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  //   products: { type: [String] },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Cart = model("Carts", cartSchema);

export default Cart;
