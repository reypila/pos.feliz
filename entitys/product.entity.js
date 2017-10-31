const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objProduct = new Schema({
    id_item: { type: Number, require: true },
    status_item: { type: Number, require: true },
    maker: { type: String, required: true },
    create_date: { type: Date, required: true },
    modification_date: { type: Date, required: true }, 
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    kind_product: { type: Number, required: true },
    image_uri: String,
    barcode: String,
    weight: String,
    size: String,
    stock:  { type: Number, required: true },
    id_cost: { type: Number, required: true },
    location: String,
    id_measurement_unit: { type: Number, required: true },
   });

const Product = mongoose.model('product', objUser);
module.exports = Product;