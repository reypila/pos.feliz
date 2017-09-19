const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objUser = new Schema({
    id_item: { type: Number, require: true },
    status_item: { type: Number, require: true },
    maker: { type: String, required: true },
    create_date: { type: Date, required: true },
    modification_date: { type: Date, required: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    lastname: String,
    lastname2: String,
    alternatemail: String,
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