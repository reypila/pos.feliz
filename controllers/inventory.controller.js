const Promise = require("promise");
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util');
const modelGeneric = require('../models/inventory.model');


module.exports = {

    Delete: function (req, res, next) {
        if (!enums.CheckExist(req.params.id) ||
            !enums.CheckExist(req.body.maker)) {
            responseutil.Send(res, enums.HTTP_STATUS_CODE.BAD_REQUEST, '', 'Required property not set', '', '', '');
            next();
        }

        // Fill Inventory Object
        const datetmp = enums.DateTimeNowToMilliSeconds();

        const objectDelete = {
            id: req.params.id,
            maker: req.body.status_item,
            status_item: enums.STATUS_ITEM.INACTIVO,
            modification_date: datetmp
        };

        modelGeneric.asyncDelete(objectDelete).then(resolve => {
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });
    },
    Update: function (req, res, next) {
        const objCatalogDetails = {
            _id: req.body._id,
            maker: req.body.maker,
            field0: req.body.name,
            status_item: req.body.status_item
        };

        model.asyncUpdate(objCatalogDetails).then(x => {
            (x == 0) ? responseutil.Send(res, 400, '', 'No se logro modificar', '', '') : responseutil.Send(res, 200, '', 'Modificado con exito', '', '');
            next();
        });

    },
    // SET object
    Patch: function function_name(req, res, next) {

        if (!enums.CheckExist(req.params.id) ||
            !enums.CheckExist(req.body.status_item) ||
            !enums.CheckExist(req.body.maker) ||
            !enums.CheckExist(req.body.product_code) ||
            !enums.CheckExist(req.body.description)) {
            responseutil.Send(res, enums.HTTP_STATUS_CODE.BAD_REQUEST, '', 'Required property not set', '', '', '');
            next();
        }

        // Fill Inventory Object
        const datetmp = enums.DateTimeNowToMilliSeconds();

        // create current items on stock
        let tmpStock = (req.body.items_current + req.body.items_entries) - req.body.items_outgoings;

        const objectPatch = {
            id: req.params.id,
            status_item: req.body.status_item,
            modification_date: datetmp,
            maker: req.body.maker,
            product_code: req.body.product_code,
            barcode: req.body.barcode,
            description: req.body.description,
            imgurl: req.body.imgurl,
            items_current: req.body.items_current,
            items_entries: req.body.items_entries,
            items_outgoings: req.body.items_outgoings,
            items_stock: tmpStock
        };

        modelGeneric.asyncPatch(objectPatch).then(resolve => {
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });

    },
    // GET BY ID
    Get: function (req, res, next) {

        const objectGet = {
            id: req.params.id
        };

        modelGeneric.asyncGet(objectGet).then(resolve => {
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });
    },
    // get all inventory
    // required filters parameters 
    // status 
    // newest first 
    // price high - low
    // price low - high
    // top sellers
    GetAll: function (req, res, next) {

        // 
        let objectInventory = { };

        if (!enums.CheckExist(req.query.filter)) {
            objectInventory.STATUS_ITEM = req.query.filter;
        }

        modelGeneric.asyncGetAll(req).then(resolve => {
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });
    },
    // create new inventory
    Create: function (req, res, next) {

        if (!enums.CheckExist(req.body.maker) ||
            !enums.CheckExist(req.body.product_code) ||
            !enums.CheckExist(req.body.description)) {
            responseutil.Send(res, enums.HTTP_STATUS_CODE.BAD_REQUEST, '', 'Required property not set', '', '', '');
            next();
        }

        const datetmp = enums.DateTimeNowToMilliSeconds();

        const objectCreate = {
            status_item: enums.STATUS_ITEM.ACTIVO,
            create_date: datetmp,
            modification_date: 0,
            maker: req.body.maker,
            product_code: req.body.product_code,
            barcode: enums.CheckExist(req.body.barcode) ? req.body.barcode : '',
            description: req.body.description,
            imgurl: req.body.imgurl,
            items_current: enums.CheckExist(req.body.items_current) ? req.body.items_current : 0,
            items_entries: enums.CheckExist(req.body.items_entries) ? req.body.items_entries : 0,
            items_outgoings: enums.CheckExist(req.body.items_outgoings) ? req.body.items_outgoings : 0,
            items_stock: enums.CheckExist(req.body.items_stock) ? req.body.items_stock : 0
        }

        modelGeneric.asyncCreate(objectCreate).then(resolve => {
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });

    }
}