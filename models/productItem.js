const mongoose = require('mongoose');
//const { Schema } = mongoose;
const Schema = mongoose.Schema;
const productItemSchema = new Schema({
    ProductLink: {
        type: String,
        required: true
    },
    Company: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        require: true,
    },
    ProductName: {
        type: String,
        required: true
    },
    LinkShop: {
        type: String,
        required: true
    }
}, { timestamps: true })
//pluralize => productss
const ProductItem = mongoose.model('products', productItemSchema)
module.exports = ProductItem