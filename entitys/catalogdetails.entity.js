const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objCatalogdetails = new Schema({
    id_item: {
        type: Number,
        require: true
    },
    status_item: {
        type: Number,
        require: true
    },
    maker: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        required: true
    },
    modification_date: {
        type: Date,
        required: true
    },
    row: {
        type: Number,
        required: true
    },
    field0: String,
    field1: String,
    field2: String,
    field3: String,
    field4: String,
    field5: String,
    field6: String,
    field7: String,
    field8: String,
    field9: String,
    field10: String,
    field11: String,
    field12: String,
    field13: String,
    field14: String,
    field15: String
});

let catalogdetails = mongoose.model('catalogdetail', objCatalogdetails);
module.exports = catalogdetails;