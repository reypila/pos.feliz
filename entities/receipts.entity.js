const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objReceipt = new Schema({
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
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    subtotal: Number,
    total: Number,
    voided: Number // anulado 
});

const Receipt = mongoose.model('receipts', objReceipt);
module.exports = Receipt;