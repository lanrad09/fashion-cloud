const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/proSchema');

const app = express();
mongoose.connect("mongodb+srv://lanrad09:AGm6jqS9I7PJCwhT@cluster0.us3dngr.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=> {
    console.log('Connenected to database!');
})
.catch(()=> {
    console.log('Connection failed!');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/products", (req, res, next)=> {
    // create new product
    const product = new Product({
        name: req.body.name,
        gtin: req.body.gtin,
        category: req.body.category,
        stock: req.body.stock,
        price: req.body.price,
        brandNamme: req.body.brandNamme
    });
    
    product.save().then(createdProduct => {
        console.log(createdProduct);
        res.status(201).json({ 
            message : "Product created successfully!"
        });

    })
   

});

app.get("/api/products", (req, res, next)=> {
    // const products = [
    //     {
    //         id: "faderese1",
    //         name: "shoe1",
    //         gtin: "1234321234567",
    //         category: "T-shirt",
    //         brandName: "addidas",
    //         price: "23",
    //     },
    //     {
    //         id: "aaderese1",
    //         name: "cap",
    //         gtin: "1234321234567",
    //         category: "Shirt",
    //         brandName: "Nike",
    //         price: "33",
    //     },
    //     {
    //         id: "aaderese1",
    //         name: "belt",
    //         gtin: "1234321234567",
    //         category: "Jacket",
    //         brandName: "Panda",
    //         price: "334",
    //     },

    // ];
    Product.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            message: "Products fetched successfully!",
            products : documents
        });
    })
    
})


module.exports = app;