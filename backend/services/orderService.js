const mongoose = require("mongoose");
const productRepository = require("../repositories/productRepository");
const orderRepository = require("../repositories/orderRepository");
const Product = require("../models/Product");

const placeOrder = async (productId, quantity) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      { new: true, session }
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

    await session.commitTransaction();
    session.endSession();

    return {
      message: "Order placed successfully"
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = {
  placeOrder
};
