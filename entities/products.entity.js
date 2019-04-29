const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objProduct = new Schema({
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
    name: String,
    barcode: String,
    weight: String,
    size: String,
    stock: {
        type: Number,
        required: true
    },
    brand: String,
    cost: Number,
    price: Number,
    // pick_url: String,
    // catalogsdetails get departments avaliables 

    description: {
        type: String,
        required: false
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'catalogsdetails'
    },
    measurement_unit_id: {
        type: Schema.Types.ObjectId,
        ref: 'catalogsdetails',
        required: true
    },
    images_id: {
        type: Schema.Types.ObjectId,
        ref: 'catalogsdetails',
        required: false
        // default: 'https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw_400x400.jpg'
    }
});

const Product = mongoose.model('products', objProduct);
module.exports = Product;