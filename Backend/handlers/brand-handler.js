const Brand = require('../DB/brand');

async function addBrand(req, res) {
    try {
        let model = req.body;
        let brand = new Brand({ name: model.name });
        const savedBrand = await brand.save();
        res.status(201).send(savedBrand.toObject());
    } catch (err) {
        res.status(500).send({ message: "Error saving brand", error: err });
    }
}


async function updateBrand(req, res) {
    try {
        let model = req.body;
        let id = req.params['id'];
        const updatedBrand = await Brand.findByIdAndUpdate({ _id: id }, model, { new: true });
        if (!updatedBrand) {
            return res.status(404).send({ message: "Brand not found" });
        }
        res.send({ message: "Brand updated successfully", brand: updatedBrand });
    } catch (err) {
        res.status(500).send({ message: "Error updating brand", error: err });
    }
}


async function deleteBrand(req, res) {
    try {
        let id = req.params['id'];
        const deletedBrand = await Brand.findByIdAndDelete(id);
        if (!deletedBrand) {
            return res.status(404).send({ message: "Brand not found" });
        }
        res.send({ message: "Brand deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: "Error deleting brand", error: err });
    }
}


async function getBrands(req, res) {
    try {
        let brands = await Brand.find();
        res.send(brands.map(brand => brand.toObject()));
    } catch (err) {
        res.status(500).send({ message: "Error fetching brands", error: err });
    }
}

async function getBrandByID(id) {
    try {
        let brand = await Brand.findById(id);
        if (!brand) {
            return null;
        }
        return brand.toObject();
    } catch (err) {
        throw new Error("Error fetching brand by ID: " + err.message);
    }
}

module.exports = { addBrand, updateBrand, deleteBrand, getBrands, getBrandByID };