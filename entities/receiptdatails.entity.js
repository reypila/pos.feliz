const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objReceiptDetail = new Schema({
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
    order: Number,
    receipt_id: {
        type: Schema.Types.ObjectId,
        ref: 'receipts'
    },
    productid: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    amount: Number,
    cost: Number,
    price: Number,
    total: Number
});

const objReceiptDetail = mongoose.model('receiptdetails', objReceiptDetail);
module.exports = objReceiptDetail;