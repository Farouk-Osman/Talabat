const Category = require('../DB/category');

async function addCategory(req, res) {
    try {
        let model = req.body;
        let category = new Category({ name: model.name });
        const savedCategory = await category.save();
        res.status(201).send(savedCategory.toObject());
    } catch (err) {
        res.status(500).send({ message: "Error saving category", error: err });
    }
}


async function updateCategory(req, res) {
    try {
        let model = req.body;
        let id = req.params['id'];
        const updatedCategory = await Category.findByIdAndUpdate({ _id: id }, model, { new: true });
        if (!updatedCategory) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.send({ message: "Category updated successfully", category: updatedCategory });
    } catch (err) {
        res.status(500).send({ message: "Error updating category", error: err });
    }
}

async function deleteCategory(req, res) {
    try {
        let id = req.params['id'];
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.send({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: "Error deleting category", error: err });
    }
}

async function getCategory(req, res) {
    let categories = await Category.find();
    res.send(categories.map(category => category.toObject()));
}


async function getCategoryByID(id) {
    let category = await Category.findById(id);
    return category.toObject();
}


module.exports = { addCategory , updateCategory , deleteCategory, getCategory, getCategoryByID };