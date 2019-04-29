const Promise = require("promise");
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util');
const modelGeneric = require('../models/inventory.model');


module.exports = {
    // DataDelete: function(req, res, next) {
    //     const objectPatch = {
    //         id: req.params.catalogid
    //     };
    //     modelGeneric.asyncDataDelete(objectPatch).then(resolve => {
    //         if (resolve.statusCode == enums.STATUS_ITEM.ERROR) {
    //             responseutil.Send(res, 400, '', resolve.message, '', '', '');
    //         }
    //         responseutil.Send(res, 200, resolve, '', '', '', '');

    //     }, reject => {
    //         responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
    //     });
    // },
    // DataGetAll: function(req, res, next) {
    //     modelGeneric.asyncDataAll().then(resolve => {
    //         if (resolve.statusCode == enums.STATUS_ITEM.ERROR) {
    //             responseutil.Send(res, 400, '', resolve.message, '', '', '');
    //         }
    //         responseutil.Send(res, 200, resolve, '', '', '', '');

    //     }, reject => {
    //         responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
    //     });
    // },
    // DataPatch: function(req, res, next) {
    //     if (!enums.CheckExist(req.params.catalogid)) {
    //         responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required parameter not set catalogid', '', '', '');
    //         next();
    //     }

    //     const objectPatch = {
    //         id: req.params.catalogid,
    //         row_order: req.body.row_order,
    //         column0: req.body.column0,
    //         column1: req.body.column1,
    //         column2: req.body.column2,
    //         column3: req.body.column3,
    //         column4: req.body.column4,
    //         column5: req.body.column5,
    //         column6: req.body.column6,
    //         column7: req.body.column7,
    //         column8: req.body.column8,
    //         column9: req.body.column9,
    //         column10: req.body.column10,
    //         column11: req.body.column11,
    //         column12: req.body.column12,
    //         column13: req.body.column13,
    //         column14: req.body.column14,
    //         column15: req.body.column15,
    //         column16: req.body.column16,
    //         column17: req.body.column17,
    //         column18: req.body.column18,
    //         column19: req.body.column19,
    //         column20: req.body.column20
    //     };

    //     modelGeneric.asynDataPatch(objectPatch).then(result => {
    //         if (result.statusCode == enums.STATUS_ITEM.ERROR) {
    //             responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', result.message, '', '', '');
    //         } else {
    //             responseutil.Send(res, enums.STATUS_ITEM.OK, result, '', '');
    //         }
    //         next();
    //     }, reject => {
    //         responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
    //     });
    // },
    // DataGet: function(req, res, next) {
    //     if (!enums.CheckExist(req.params.catalogid)) {
    //         responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required property not set catalogid', '', '', '');
    //         next();
    //     }

    //     const objectPatch = {
    //         id: req.params.catalogid
    //     };

    //     modelGeneric.asynDataGet(objectPatch).then(resolve => {
    //         responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
    //     }, reject => {
    //         responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
    //         next();
    //     });
    // },
    // DataAdd: function(req, res, next) {
    //     // body...
    //     if (!enums.CheckExist(req.params.catalogid) ||
    //         !enums.CheckExist(req.body.status_item) ||
    //         !enums.CheckExist(req.body.row_order)) {
    //         responseutil.Send(res, enums.HTTP_STATUS_CODE.BAD_REQUEST, '', 'Required property not set id, catalogid, status_item, row_order', '', '', '');
    //         next();
    //     }

    //     // fill Catalog object
    //     const objectPatch = {
    //         catalogsid: req.params.catalogid,
    //         status_item: req.body.status_item,
    //         row_order: req.body.row_order,
    //         column0: req.body.column0,
    //         column1: req.body.column1,
    //         column2: req.body.column2,
    //         column3: req.body.column3,
    //         column4: req.body.column4,
    //         column5: req.body.column5,
    //         column6: req.body.column6,
    //         column7: req.body.column7,
    //         column8: req.body.column8,
    //         column9: req.body.column9,
    //         column10: req.body.column10,
    //         column11: req.body.column11,
    //         column12: req.body.column12,
    //         column13: req.body.column13,
    //         column14: req.body.column14,
    //         column15: req.body.column15,
    //         column16: req.body.column16,
    //         column17: req.body.column17,
    //         column18: req.body.column18,
    //         column19: req.body.column19,
    //         column20: req.body.column20
    //     };

    //     modelGeneric.asyncDataAdd(objectPatch).then(resolve => {
    //         responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
    //     }, reject => {
    //         responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
    //         next();
    //     });
    // },
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
    GetAll: function (req, res, next) {
        modelGeneric.asyncGetAll().then(resolve => {
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