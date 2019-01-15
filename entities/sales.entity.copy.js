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
        type: String,
        required: true
    },
    invoice_number: {
        type: String,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    product_code: {
        type: Schema.Types.ObjectId,
        ref: 'inventories'
    },
    iva: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    salesman: {
        type: String,
        required: true
    }
});

let sales = mongoose.model('sales', obj);
module.exports = sales;