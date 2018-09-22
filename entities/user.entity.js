const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objUser = new Schema({
    item_order: { type: Number, require: true },
    status_item_id: { type: Number, require: true },
    maker: { type: String, required: true },
    create_date: { type: Number, required: true },
    modification_date: { type: Number, required: true }, 
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    name: String,
    lastname: String,
    lastname2: String,
    alternatemail: String,
    birthday: Number,
    rfc: String,
    curp: String,
    genre_id: Number,
    zipcode: String,
    home_reference: String,
    address: String,
    apartment_number_int: String,
    apartment_number_ext: String,
    telephone_number: String,
    telephone_number2: String,
    rol_id: { type: String, required: true }
   });

const User = mongoose.model('users', objUser);
module.exports = User;