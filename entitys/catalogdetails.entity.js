const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objCatalogdetails = new Schema({  
    status_item: {
        type: Boolean,
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
    id_table: {
        type: Number,
        required: true
    },
    table_name: {
        type: String,
        required: true
    },
    row: {
        type: Number,
        required: true
    },
    column0: String,
    column1: String,
    column3: String,
    column4: String,
    column5: String,
    column6: String,
    column7: String,
    column2: String,
    column8: String,
    column9: String,
    column10: String,
    column11: String,
    column12: String,
    column13: String,
    column14: String,
    column15: String,
    column16: String,
    column17: String,
    column18: String,
    column19: String,
    column20: String,
});

let catalogdetails = mongoose.model('catalogs', objCatalogdetails);
module.exports = catalogdetails;