const Product = require("../models/Product");

const findById = async (productId) => {
  return await Product.findById(productId);
};

const updateStock = async (productId, newStock) => {
  return await Product.findByIdAndUpdate(
    productId,
    { stock: newStock },
    { new: true }
  );
};

module.exports = {
  findById,
  updateStock
};
