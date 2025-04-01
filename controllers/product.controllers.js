export const CreateProduct = (req, res) => {
  try {
    return res.send("Product successfully created.");
  } catch (error) {
    console.log(error, "error in register api call.");
    return res.send(error);
  }
};
