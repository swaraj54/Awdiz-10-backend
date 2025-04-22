import User from "./../models/user.schema.js";
import Product from "./../models/product.schema.js";
import Cart from "../models/cart.schema.js";
export const addToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User is required." });
    }
    if (!productId) {
      return res.json({ success: false, message: "Product is required." });
    }
    const isUserExists = await User.findById(userId);
    if (!isUserExists) {
      return res.json({ success: false, message: "User not found." });
    }
    const isProductExists = await Product.findById(productId);
    if (!isProductExists) {
      return res.json({ success: false, message: "Product not found." });
    }

    const isUserDocumentExists = await Cart.findOne({ userId });
    if (isUserDocumentExists) {
      isUserDocumentExists.products.push(productId);
      await isUserDocumentExists.save();
    } else {
      const newCartProduct = Cart({
        userId: userId,
        products: [productId],
      });
      await newCartProduct.save();
    }
    return res.json({
      success: true,
      message: "Product successfully added to cart.",
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User is required." });
    }
    const cartUserData = await Cart.findOne({ userId });
    if (!cartUserData) {
      return res.json({
        success: true,
        products: [],
        noProductFound: true,
      });
    }
    return res.json({
      success: true,
      products: cartUserData.products,
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
};
