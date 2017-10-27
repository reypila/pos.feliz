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
    birthday: Date,
    rfc: String,
    curp: String,
    genre: Number,
    zipcode: String,
    home_reference: String,
    apartment_number: String,
    telephone_number: String,
    telephone_number2: String
   });

let User = mongoose.model('users', objUser);
module.exports = User;