const express = require('express');
const router = express.Router();
const Category = require('../DB/category');
const { addCategory, updateCategory } = require('../handlers/categorey-handler');

router.post("", async (req, res) => {
    let result = await addCategory(req, res);
    
    res.send(result);
});


router.put("/:id", async (req, res) => {
    await updateCategory(req, res);
    res.send({messege : "Category updated successfully"});
});

module.exports = router;