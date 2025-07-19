const Category = require('../DB/category');

async function addCategory(req, res) {
    let model = req.body;

    let category = new Category({
        name: model.name
    });

    category.save()
        .then(savedCategory => {
            res.status(201).send(savedCategory.toObject());
        })
        .catch(err => {
            res.status(500).send({ message: "Error saving category", error: err });
        });

    return category.toObject();
}

async function updateCategory(req, res) {
    let model = req.body;
    let id = req.params['id'];

    Category.findByIdAndUpdate({ _id: id }, model, { new: true })
        .then(updatedCategory => {
            if (!updatedCategory) {
                return res.status(404).send({ message: "Category not found" });
            }
            res.send({ message: "Category updated successfully", category: updatedCategory });
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating category", error: err });
        });
}

module.exports = { addCategory , updateCategory };