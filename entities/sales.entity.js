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
    no_invoice: {
         type: String,
        required: true  
    },
    purchase_date:{
         type: Number,
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
    quantity: {
        type: Number,
        required: true
    },
});

let sales = mongoose.model('sales', object);
module.exports = sales;