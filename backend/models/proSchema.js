const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: {type: String, required: true},
    gtin: {type: String, default:"0123456789056"},
    category: {type:String},
    stock: {type: Number},
    price: {type: Number},
    brandName: {type: String}
});

module.exports = mongoose.model('Product', productsSchema);
