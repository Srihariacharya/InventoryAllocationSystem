const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ["SUCCESS", "FAILED"],
    required: true
  }
});

module.exports = mongoose.model("Order", orderSchema);
