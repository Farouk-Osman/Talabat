const express = require('express');
const router = express.Router();
const Product = require('../DB/product');
const { addProduct, updateProduct, deleteProduct, getProduct,getAllProducts } = require('../handlers/product-handler');
const e = require('express');

router.post("", async (req, res) => {
    let result = await addProduct(req, res);
    res.send(result);
});

router.put("/:id", async (req, res) => {
    
    await updateProduct(req, res);
    res.send({ message: "Product updated successfully" });
});


router.delete("/:id", async (req, res) => {
    await deleteProduct(req, res);
    res.send({ message: "Product deleted successfully" });
});

router.get("", async (req, res) => {
       let products = await getAllProducts(req, res);
        return res.send(products);    
});
router.get("/:id", async (req, res) => {
    let id = req.params['id'];
    let product = await getProduct(req, res);
    if (!product) {
        return res.status(404).send({ message: "Product not found" });
    }
    res.send(product);
});
module.exports = router;