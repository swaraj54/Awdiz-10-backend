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
    const isProductExists = await Product.findOne({ name });
    if (isProductExists) {
      return res.json({
        success: false,
        message: "Product name already exists, please use another one.",
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
      products: products,
      success: true,
      message: "Product successfully fetched.",
    });
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.json({ success: false, error });
  }
};

export const AllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.json({
      products: products,
      success: true,
      message: "Product successfully fetched.",
    });
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.json({ success: false, error });
  }
};

export const SingleProductData = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.json({
        success: false,
        message: "Product id is requied.",
      });
    }

    const product = await Product.findById(productId).populate("userId");

    return res.json({
      productData: product,
      success: true,
      message: "Product successfully fetched.",
    });
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.json({ success: false, error });
  }
};
