const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require("./routes/products");


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

app.use("/api/products", productsRoutes);

module.exports = app;