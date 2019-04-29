const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let objMeasurementUnit = new Schema({
    id_item: { type: Number, require: true },
    status_item: { type: Number, require: true },
    maker: { type: String, required: true },
    create_date: { type: Date, required: true },
    modification_date: { type: Date, required: true },
    descripcion: { type: String, required: true }
});

const MeasurementUnit = mongoose.model('measurementunit', objMeasurementUnit);
module.exports = MeasurementUnit;