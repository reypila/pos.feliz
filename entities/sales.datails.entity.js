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
    items: { type:Number },
    items_subtotal: { type:Number },
    items_iva: { type:Number },
    items_total: { type:Number }
});

let salesdetails = mongoose.model('salesdetails', obj);
module.exports = salesdetails;