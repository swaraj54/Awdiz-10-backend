import User from "./../models/user.schema.js";
import Product from "./../models/product.schema.js";
import Cart from "../models/cart.schema.js";
import Order from "../models/order.schema.js";
import { io, sellersSockets } from "../index.js";
export const addToCart = async (req, res) => {
  try {
    console.log("addtocart inside.")
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

    // const isUserDocumentExists = await Cart.findOne({ userId });
    // if (isUserDocumentExists) {
    //   isUserDocumentExists.products.push(productId);
    //   await isUserDocumentExists.save();
    // } else {
    //   const newCartProduct = Cart({
    //     userId: userId,
    //     products: [productId],
    //   });
    //   await newCartProduct.save();
    // }

    const userCart = await Cart.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { products: productId } },
      { new: true, upsert: true }
    );
    console.log(userCart, "userCart");

    return res.json({
      cartProducts: userCart,
      success: true,
      message: "Product successfully added to cart.",
    });
  } catch (error) {
    console.log(error,"error in addto cart api")
    return res.json({ success: false, error });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User is required." });
    }
    const cartUserData = await Cart.findOne({ userId }).populate("products");
    if (!cartUserData) {
      return res.json({
        success: true,
        products: [],
        noProductFound: true,
      });
    }
    let totalPrice = 0;
    for (let i = 0; i < cartUserData.products.length; i++) {
      totalPrice += cartUserData.products[i].price;
    }
    return res.json({
      totalPrice: totalPrice,
      success: true,
      products: cartUserData.products,
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export const checkout = async (req, res) => {
  try {
    const { userId, products } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User is required." });
    }
    if (!products || products.length == 0) {
      return res.json({ success: false, message: "Produsts is required." });
    }
    const isUserExists = await User.findById(userId);
    if (!isUserExists) {
      return res.json({ success: false, message: "User not found." });
    }
    let allProductsIds = [];
    let totalPrice = 0;

    // let allSellersId = [];

    for (let i = 0; i < products.length; i++) {
      allProductsIds.push(products[i]._id);
      totalPrice += products[i].price;

      const productData = await Product.findById(products[i]._id);
      // allSellersId.push(productData.userId);
      console.log(sellersSockets,"sellersSockets",productData.userId,"productData.userId")
      const sellerSocketIdFound = sellersSockets.get(productData.userId.toString());
      console.log(sellerSocketIdFound,"sellerSocketIdFound")
      if (sellerSocketIdFound) {
        io.to(sellerSocketIdFound).emit("productBuy", {
          buyerName: isUserExists.name,
          productData: productData,
        });
        // mongodb -> notification schema 
      }
    }

    const newOrder = Order({
      userId,
      products: allProductsIds,
      price: totalPrice,
    });

    console.log(newOrder, "newOrder");
    await newOrder.save();

    await Cart.findOneAndUpdate({ userId }, { products: [] });

    return res.json({
      success: true,
      message: "Order Successfull, you'll get product deliver soon.",
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ success: false, error });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User is required." });
    }
    const ordersUserData = await Order.find({ userId }).populate("products");
    if (ordersUserData?.length == 0) {
      return res.json({
        success: false,
        message: "No orders found.",
      });
    }
    return res.json({
      success: true,
      orders: ordersUserData,
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
};
