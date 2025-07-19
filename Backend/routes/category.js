const express = require('express');
const router = express.Router();
const Category = require('../DB/category');
const { addCategory , updateCategory , deleteCategory, getCategory,getCategoryByID } = require('../handlers/categorey-handler');

router.post("", async (req, res) => {
    let result = await addCategory(req, res);
    
    res.send(result);
});


router.put("/:id", async (req, res) => {
    await updateCategory(req, res);
    res.send({messege : "Category updated successfully"});
});

router.delete("/:id", async (req, res) => {
    await deleteCategory(req, res);
    res.send({ message: "Category deleted successfully" });
});

router.get("", async (req, res) => {
    let category = await getCategory(req, res); 
    res.send(category);
});

router.get("/:id", async (req, res) => {
    let id = req.params['id'];
    let category = await getCategoryByID(id);
    if (!category) {
        return res.status(404).send({ message: "Category not found" });
    }
    res.send(category);
});


module.exports = router;