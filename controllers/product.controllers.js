import Product from "../models/product.schema.js";
import User from "./../models/user.schema.js";

export const AddProduct = async (req, res) => {
  try {
    const { name, price, quantity, category, image } = req.body.productData;
    const { userId } = req.body;
    console.log(
      name,
      price,
      quantity,
      category,
      image,
      " name, price, quantity, category, image"
    );
    console.log(userId, "userId");

    const isUserExist = await User.findById(userId);
    console.log(isUserExist, "isUserExist");
    if (!isUserExist) {
      return res.json({ success: false, message: "User not found." });
    }
    if (isUserExist.role != "seller") {
      return res.json({
        success: false,
        message: "You are not seller to add product.",
      });
    }
    const newProduct = Product({
      name,
      price,
      quantity,
      category,
      image,
      userId,
    });
    await newProduct.save();
    console.log(newProduct, "newProduct");

    return res.json({
      success: true,
      message: "Product successfully created.",
    });
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.json({ success: false, error });
  }
};

export const AddedProducts = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User id is required." });
    }
    const products = await Product.find({ userId: userId });
    console.log(products, "products");

    return res.json({
      products : products,
      success: true,
      message: "Product successfully fetched.",
    });
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.json({ success: false, error });
  }
};
