const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objCatalogs = new Schema({  
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
    row_order: {
        type: Number,
        required: true
    }
});

let catalogs = mongoose.model('catalogs', objCatalogs);
module.exports = catalogs;