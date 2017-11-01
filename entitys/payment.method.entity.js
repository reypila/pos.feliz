const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objPaymentMethod = new Schema({
    id_item: { type: Number, require: true },
    status_item: { type: Number, require: true },
    maker: { type: String, required: true },
    create_date: { type: Date, required: true },
    modification_date: { type: Date, required: true },
    descripcion: { type: String, required: true },
    clave: { type: String, required: true },
    descripcion: { type: String, required: true }
});

const PaymentMethod = mongoose.model('paymentmethod', objPaymentMethod);
module.exports = PaymentMethod;