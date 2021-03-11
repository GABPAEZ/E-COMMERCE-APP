const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

// lista de categorias
router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

// buscar una categoria por id dado

router.get(`/:id`, async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res
      .status(500)
      .json({ message: "Category with de ID given not found" });
  } else {
    res.status(200).send(category);
  }
});

// updated a category

router.put(`/:id`, async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) {
    return res
      .status(500)
      .json({ message: "Category with de ID given not found" });
  } else {
    res.status(200).send(category);
  }
});

// grabar un categoria
router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(404).send("Category can't be created!");
  res.send(category);
});

// borrar una categoria

router.delete(`/:id`, (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((categeryDeleted) => {
      if (categeryDeleted) {
        return res
          .status(200)
          .json({ success: true, message: "Category has been deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err: err });
    });
});

module.exports = router;
