const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const mongoose = require("mongoose");

// lista de productos
router.get(`/`, async (req, res) => {
  const productList = await Product.find().populate("category");
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

//un solo producto

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

// grabar un producto
router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("Invalid category");
  }

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product can't be created" });
  } else {
    return res.status(200).send(product);
  }
});

// actualizar un producto tiene dos forma de validad por moonfese id y por promise

router.put(`/:id`, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("Invalid Category");
  }
  let product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );
  if (!product) {
    return res
      .status(500)
      .json({ message: "Product with de ID given not found" });
  } else {
    res.send("Updated sucessfully");
    res.status(200).send(product);
  }
});

// delete product

router.delete(`/:id`, (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((categeryDeleted) => {
      if (categeryDeleted) {
        return res
          .status(200)
          .json({ success: true, message: "Product has been deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err: err });
    });
});

// cantidad de products

router.get(`/get/count`, async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);
  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    productCount: productCount,
  });
});

// solo los productos con feature true para que puedan ser mostrados y limite de cantidad

router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count;
  const product = await Product.find({ isFeatured: true }).limit(+count);
  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send({
    productCount: product,
  });
});

//Filtering by categoryList

router.get(`/`, async (req, res) => {
  const productList = await Product.find().populate("category");
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});



module.exports = router;
