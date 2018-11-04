const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let obj = new Schema({  
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
        type:String,
        required: true
    },
    invoice_number: { type:String },
    subtotal: { type:Number },
    iva: { type:Number },
    total: { type:Number },
    client: { type:String },
    salesman: { type:String }
});

let sales = mongoose.model('sales', obj);
module.exports = sales;