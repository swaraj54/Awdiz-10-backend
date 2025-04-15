export const AddProduct = (req, res) => {
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

    
    return res.json({ success: true, message: "Product successfully created." });
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.json({ success: false, error });
  }
};
