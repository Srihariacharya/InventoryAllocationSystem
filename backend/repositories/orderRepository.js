const Order = require("../models/Order");

const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

module.exports = {
  createOrder
};
