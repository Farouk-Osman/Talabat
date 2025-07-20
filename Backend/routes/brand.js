const express = require('express');
const router = express.Router();

const Brand = require('../DB/brand');
const { addBrand, updateBrand, deleteBrand, getBrands, getBrandByID } = require('../handlers/brand-handler');

router.post("", async (req, res) => {
    let result = await addBrand(req, res);
    res.send(result);
});


router.put("/:id", async (req, res) => {
    await updateBrand(req, res);
    res.send({ message: "Brand updated successfully" });
});

router.delete("/:id", async (req, res) => {
    await deleteBrand(req, res);
    res.send({ message: "Brand deleted successfully" });
});
router.get("", async (req, res) => {
    let brands = await getBrands(req, res);
    res.send(brands);
});

router.get("/:id", async (req, res) => {
    let id = req.params['id'];
    let brand = await getBrandByID(id);
    if (!brand) {
        return res.status(404).send({ message: "Brand not found" });
    }
    res.send(brand);
});

module.exports = router;