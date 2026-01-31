const Product = require("../models/Product");
const orderRepository = require("../repositories/orderRepository");

const placeOrder = async (productId, quantity) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero");
  }

  // Atomic stock deduction (concurrency-safe)
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId, stock: { $gte: quantity } },
    { $inc: { stock: -quantity } },
    { new: true }
  );

  if (!updatedProduct) {
    await orderRepository.createOrder({
      productId,
      quantity,
      status: "FAILED"
    });

    throw new Error("Insufficient stock or product not found");
  }

  await orderRepository.createOrder({
    productId,
    quantity,
    status: "SUCCESS"
  });

  return {
    message: "Order placed successfully"
  };
};

module.exports = {
  placeOrder
};
