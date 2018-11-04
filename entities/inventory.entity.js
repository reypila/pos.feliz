const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let object = new Schema({
    status_item: {
        type: Number,
        require: true
    },
    create_date: {
        type: Number,
        required: true
    },
    modification_date: {
        type: Number,
        required: true
    },
    maker: {
        type: String,
        required: true
    },
    product_code: {
        type: String,
        required: true
    },
    barcode: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    items_current: {
        type: Number
    },
    items_entries: {
        type: Number
    },
    items_outgoings: {
        type: Number
    },
    items_stock: {
        type: Number
    }
});

let inventories = mongoose.model('inventories', object);
module.exports = inventories;