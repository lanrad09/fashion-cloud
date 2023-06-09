const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

app.get("/api/products", (req, res, next)=> {
    const products = [
        {
            id: "faderese1",
            name: "shoe1",
            gtin: "1234321234567",
            category: "T-shirt",
            brandName: "addidas",
            price: "23",
        },
        {
            id: "aaderese1",
            name: "cap",
            gtin: "1234321234567",
            category: "Shirt",
            brandName: "Nike",
            price: "33",
        },
        {
            id: "aaderese1",
            name: "belt",
            gtin: "1234321234567",
            category: "Jacket",
            brandName: "Panda",
            price: "334",
        },

    ];
    res.status(200).json({
        message: "Products fectched successfully!",
        products : products
    });
})


module.exports = app;