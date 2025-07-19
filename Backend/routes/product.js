const express = require('express');
const router = express.Router();
const Product = require('../DB/product');
const { addProduct, updateProduct, deleteProduct, getProduct } = require('../handlers/product-handler');



router.post("", addProduct);


router.put("/:id", updateProduct);


router.delete("/:id", deleteProduct);


router.get("/:id", getProduct);