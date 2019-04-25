const enums = require('../util/enum.util');
const Promise = require("promise");
const responseutil = require('../util/response.util');
const modelCatalog = require('../models/catalogs.model');


module.exports = {
    DataDelete: function(req, res, next) {
        const requestObject = {
            id: req.params.catalogid
        };
        modelCatalog.asyncDataDelete(requestObject).then(resolve => {
            if (resolve.statusCode == enums.STATUS_ITEM.ERROR) {
                responseutil.Send(res, 400, '', resolve.message, '', '', '');
            }
            responseutil.Send(res, 200, resolve, '', '', '', '');

        }, reject => {
            responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
        });
    },
    DataGetAll: function(req, res, next) {
        modelCatalog.asyncDataAll().then(resolve => {
            if (resolve.statusCode == enums.STATUS_ITEM.ERROR) {
                responseutil.Send(res, 400, '', resolve.message, '', '', '');
            }
            responseutil.Send(res, 200, resolve, '', '', '', '');

        }, reject => {
            responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
        });
    },
    DataPatch: function(req, res, next) {
        if (!enums.CheckExist(req.params.catalogid)) {
            responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required parameter not set catalogid', '', '', '');
            next();
        }

        const requestObject = {
            id: req.params.catalogid,
            row_order: req.body.row_order,
            column0: req.body.column0,
            column1: req.body.column1,
            column2: req.body.column2,
            column3: req.body.column3,
            column4: req.body.column4,
            column5: req.body.column5,
            column6: req.body.column6,
            column7: req.body.column7,
            column8: req.body.column8,
            column9: req.body.column9,
            column10: req.body.column10,
            column11: req.body.column11,
            column12: req.body.column12,
            column13: req.body.column13,
            column14: req.body.column14,
            column15: req.body.column15,
            column16: req.body.column16,
            column17: req.body.column17,
            column18: req.body.column18,
            column19: req.body.column19,
            column20: req.body.column20
        };

        modelCatalog.asynDataPatch(requestObject).then(result => {
            if (result.statusCode == enums.STATUS_ITEM.ERROR) {
                responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', result.message, '', '', '');
            } else {
                responseutil.Send(res, enums.STATUS_ITEM.OK, result, '', '');
            }
            next();
        }, reject => {
            responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
        });
    },
    DataGet: function(req, res, next) {
        if (!enums.CheckExist(req.params.catalogid)) {
            responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required property not set catalogid', '', '', '');
            next();
        }

        const requestObject = {
            id: req.params.catalogid
        };

        modelCatalog.asynDataGet(requestObject).then(resolve => {
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
        }, reject => {
            responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
            next();
        });
    },
    DataAdd: function(req, res, next) {
        // body...
        if (!enums.CheckExist(req.params.catalogid) ||
            !enums.CheckExist(req.body.status_item) ||
            !enums.CheckExist(req.body.row_order)) {
            responseutil.Send(res, enums.HTTP_STATUS_CODE.BAD_REQUEST, '', 'Required property not set id, catalogid, status_item, row_order', '', '', '');
            next();
        }

        // fill Catalog object
        const requestObject = {
            catalogsid: req.params.catalogid,
            status_item: req.body.status_item,
            row_order: req.body.row_order,
            column0: req.body.column0,
            column1: req.body.column1,
            column2: req.body.column2,
            column3: req.body.column3,
            column4: req.body.column4,
            column5: req.body.column5,
            column6: req.body.column6,
            column7: req.body.column7,
            column8: req.body.column8,
            column9: req.body.column9,
            column10: req.body.column10,
            column11: req.body.column11,
            column12: req.body.column12,
            column13: req.body.column13,
            column14: req.body.column14,
            column15: req.body.column15,
            column16: req.body.column16,
            column17: req.body.column17,
            column18: req.body.column18,
            column19: req.body.column19,
            column20: req.body.column20
        };

        modelCatalog.asyncDataAdd(requestObject).then(resolve => {
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });
    },
    Delete: function(req, res, next) {
        if (!enums.CheckExist(req.params.id)) {
            responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required property not set id ', '', '', '');
            next();
        }

        // fill Catalog object
        const requestObject = {
            id: req.params.id,
            status_item: false

        };

        modelCatalog.asyncDelete(requestObject).then(resolve => {
            if (resolve.statusCode == enums.STATUS_ITEM.ERROR) {
                responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', resolve.message, '', '', '');
            } else {
                responseutil.Send(res, enums.STATUS_ITEM.OK, resolve, '', '');
            }
        }, reject => {
            responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
            next();
        });
    },
    Update: function(req, res, next) {
        const objCatalogDetails = {
            _id: req.body._id,
            maker: req.body.maker,
            field0: req.body.name,
            status_item: req.body.status_item
        };

        model.asyncUpdate(objCatalogDetails).then(x => {
            (x == 0) ? responseutil.Send(res, 400, '', 'No se logro modificar', '', ''): responseutil.Send(res, 200, '', 'Modificado con exito', '', '');
            next();
        });

    },
    Patch: function function_name(req, res, next) {

        if (!enums.CheckExist(req.params.id) ||
            !enums.CheckExist(req.body.status_item) ||
            !enums.CheckExist(req.body.table_name) ||
            !enums.CheckExist(req.body.row_order)) {
            responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required property not set id, status_item, table_name or row_order', '', '', '');
            next();
        }

        // fill Catalog object
        const requestObject = {
            id: req.params.id,
            status_item: req.body.status_item,
            table_name: req.body.table_name,
            row_order: req.body.row_order
        };

        modelCatalog.asyncPatch(requestObject).then(resolve => {
            if (resolve.statusCode == enums.STATUS_ITEM.ERROR) {
                responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', resolve.message, '', '', '');
            } else {
                responseutil.Send(res, enums.STATUS_ITEM.OK, resolve, '', '');
            }
        }, reject => {
            responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
            next();
        });
        // }
    },
    Get: function(req, res, next) {
        //
        const objcatalogdetails = {
            id: req.params.id
        };
        modelCatalog.asynGet(objcatalogdetails).then(result => {
            if (result.statusCode == enums.STATUS_ITEM.ERROR) {
                responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', x.message, '', '', '');
            } else {
                responseutil.Send(res, enums.STATUS_ITEM.OK, result, '', '');
            }
            next();
        }, reject => {
            responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
        });
    },
    GetAll: function(req, res, next) {
        modelCatalog.asyncGetAll().then(resolve => {
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });
    },
    Create: function(req, res, next) {

        if (!req.body.table_name) {
            responseutil.Send(res, 400, '', 'table_name is necesary', '', '', '');
        }
        const tmp_table_name = req.body.table_name.toUpperCase();

        let catalogObj = {
            table_name: tmp_table_name
        };

        modelCatalog.asyncCreate(catalogObj).then(resolve => {
           
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);

        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });

    }
}