const express = require('express');
const router = express.Router();
const { getNewProducts, getFeaturedProducts } = require('../handlers/product-handler');

router.get("/new-products", async (req, res) => {
    await getNewProducts(req, res);
});

router.get("/featured-products", async (req, res) => {
    await getFeaturedProducts(req, res);

});

module.exports = router;