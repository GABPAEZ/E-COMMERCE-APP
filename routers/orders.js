const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");

// lista de productos
router.get(`/`, async (req, res) => {
  const orderList = await Order.find();
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});



// grabar un producto
router.post(`/`, (req, res) => {
  const order = new Order({});
  order
    .save()
    .then((orderSaved) => {
      res.status(200).json(orderSaved);
    })
    .catch((err) => {
      res.status(500).json({ err: err, success: false });
    });
});

module.exports = router;
