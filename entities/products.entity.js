const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objProduct = new Schema({
    item_order: {
        type: Number,
        require: true
    },
    status_item_id: {
        type: Number,
        require: true
    },
    maker: {
        type: String,
        required: true
    },
    create_date: {
        type: Number,
        required: true
    },
    modification_date: {
        type: Number,
        required: true
    },
    name: String,
    barcode: String,
    weight: String,
    size: String,
    stock: {
        type: Number,
        required: true
    },
    brand: String,
    cost: Number,
    price: Number,
    pick_url: String,
    description: {
        type: String,
        required: false
    },
    measurement_unit_id: {
        type: String,
        required: true
    },
});

const Product = mongoose.model('products', objProduct);
module.exports = Product;