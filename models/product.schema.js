import { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  userId: { type: String, required: true },
});

const Product = model("Product", productSchema);

export default Product;
