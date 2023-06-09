const express = require("express");
const Product = require('../models/proSchema');


const router = express.Router();

router.post("", (req, res, next)=> {
    const product = new Product({
        name: req.body.name,
        gtin: req.body.gtin,
        category: req.body.category,
        stock: req.body.stock,
        price: req.body.price,
        brandNamme: req.body.brandNamme
    });
    product.save().then(createdPost => {
        res.status(201).json({
            message: "Post added successfully!!!",
            postId: createdPost._id
        });
    });
});

router.put("/:id", (req, res, next) => {
    const product = new Product({
        _id: req.params.id,
        name: req.body.name,
        gtin: req.body.gtin,
        category: req.body.category,
        stock: req.body.stock,
        price: req.body.price,
        brandNamme: req.body.brandNamm
    });
    product.updateOne({ _id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({ message: "Update successful!"})
    });

});

router.get("", (req, res, next)=> {

    Product.find().then(documents => {
        // console.log(documents);
        res.status(200).json({
            message: "Products fetched successfully!",
            products : documents
        });
    })
    
})


router.get("/:id", (req, res, next) => {
    product.findById(req.params.id).then( product => {
        if(product) {
            res.status(200).json(product);

        } else {
            res.status(400).json({ message: 'product not found!'});
        }
    })
});

router.delete("/:id", (req, res, next) => {
    product.deleteOne({_id: req.params.id}).then(result => {
        // console.log(result)
        res.status(200).json({ message: "Product deleted succefully"});
    })      
});

module.exports = router;
