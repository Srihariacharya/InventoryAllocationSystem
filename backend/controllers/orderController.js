const orderService = require("../services/orderService");

const placeOrder = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const result = await orderService.placeOrder(productId, quantity);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

module.exports = {
  placeOrder
};
