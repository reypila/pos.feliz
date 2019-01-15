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
    items_entries: {
        type: Number
    }
});

let entries = mongoose.model('entries', object);
module.exports = entries;