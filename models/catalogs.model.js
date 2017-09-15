const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objcatalogs = new Schema({   
    id_item: { type: Number, require: true },
    status_item: { type: Number, require: true },
    maker: { type: String, required: true },
    create_date: { type: Date, required: true },
    modification_date: { type: Date, required: true },
    name: { type: String, required: true },
    details: { type: String, required: true }
});

let catalogs = mongoose.model('catalogs', objcatalogs);
module.exports = catalogs;