const Product = require('./../DB/product');

async function addProduct(req, res) {
    try {
        console.log('addProduct req.body:', req.body);
        let model = req.body;
        let product = new Product(model);
        const savedProduct = await product.save();
        res.status(201).send(savedProduct.toObject());
    } catch (err) {
        console.error('addProduct error:', err);
        res.status(500).send({ message: "Error saving product", error: err });
    }
}

async function updateProduct(req, res) {
    try {
        let model = req.body;
        let id = req.params['id'];
        const updatedProduct = await Product.findByIdAndUpdate(id, model, { new: true });
        if (!updatedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.send({ message: "Product updated successfully", product: updatedProduct });
    } catch (err) { 
        res.status(500).send({ message: "Error updating product", error: err });
    }
}

async function deleteProduct(req, res) {
    try {
        let id = req.params['id'];
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.send({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: "Error deleting product", error: err });
    }
}

async function getProduct(req, res) {
    try {
        let id = req.params['id'];
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.send(product);
    } catch (err) {
        res.status(500).send({ message: "Error retrieving product", error: err });
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await Product.find();
        res.send(products.map(product => product.toObject()));
    } catch (err) {
        res.status(500).send({ message: "Error retrieving products", error: err });
    }
}
async function getFeaturedProducts(req, res) {
    try {
        const products = await Product.find({ isFeatured: true });
        res.send(products.map(product => product.toObject()));
    } catch (err) {
        res.status(500).send({ message: "Error retrieving featured products", error: err });
    }
}

async function getNewProducts(req, res) {
    try {
        const products = await Product.find({ isNewProduct : true });
        res.send(products.map( (product) => product.toObject()));
    } catch (err) {
        res.status(500).send({ message: "Error retrieving new products", error: err });
    }
}
module.exports = { addProduct, updateProduct, deleteProduct, getProduct, getAllProducts, getFeaturedProducts, getNewProducts };