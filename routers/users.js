const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

// lista de productos
router.get(`/`, async (req, res) => {
  const userList = await User.find();
  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

// grabar un producto
router.post(`/`, (req, res) => {
  const user = new User({});
  user
    .save()
    .then((userSaved) => {
      res.status(200).json(userSaved);
    })
    .catch((err) => {
      res.status(500).json({ err: err, success: false });
    });
});

module.exports = router;
