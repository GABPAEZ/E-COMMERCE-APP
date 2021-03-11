const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

const { Product } = require("./models/product");
const api = process.env.API_URL;
const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const ordersRouter = require("./routers/orders");
const usersRouter = require("./routers/users");

//middleware

app.use(morgan("tiny"));
app.use(express.json());

//Router

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);

// conexion a mongo antes del servidor

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database is ready to use...");
  })
  .catch((err) => {
    console.log(err);
  });

//alta servidor

app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
  //console.log(API);
});
