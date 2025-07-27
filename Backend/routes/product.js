const express = require('express');
const router = express.Router();
const Product = require('../DB/product');
const { addProduct, updateProduct, deleteProduct, getProduct,getAllProducts } = require('../handlers/product-handler');
const e = require('express');

router.post("", async (req, res) => {
    await addProduct(req, res);
});

router.put("/:id", async (req, res) => {
    await updateProduct(req, res);
});


router.delete("/:id", async (req, res) => {
    await deleteProduct(req, res);
});

router.get("", async (req, res) => {
       await getAllProducts(req, res);
});
router.get("/:id", async (req, res) => {
    await getProduct(req, res);
});
module.exports = router;