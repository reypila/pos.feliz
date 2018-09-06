const enums = require('../util/enum.util');
const Promise = require("promise");
const responseutil = require('../util/response.util');
const modelCatalog = require('../models/catalogs.model');

module.exports = {
  Update: function function_name(req, res, next) {

    // validate body object
    if (!req.body.id || !req.body.status_item || !req.body.table_name || !req.body.row_order) {
      responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required property not set id, status_item, table_name or row_order', '', '', '');
      next();
    }

    // fill Catalog object
    const requestObject = {
      id: req.params.id,
      status_item: req.params.status_item,
      table_name: req.params.table_name,
      row_order: req.params.row_order
    };

    modelCatalog.asyncPatch(requestObject).then(resolve => {
      if (resolve.statusCode == enums.STATUS_ITEM.ERROR) {
        responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', resolve.message, '', '', '');
      } else {
        responseutil.Send(res, enums.STATUS_ITEM.OK, resolve, '', '');
      }
    },reject => {
      responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
      next();
    });
  },
  Get: function(req, res, next) {

    const objcatalogdetails = {
      id: req.params.id
    };
    modelCatalog.asynGet(objcatalogdetails).then(result => {
      if (result.statusCode == enums.STATUS_ITEM.ERROR) {
        responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', x.message, '', '', '');
      } else {
        // console.dir(result);
        responseutil.Send(res, enums.STATUS_ITEM.OK, result, '', '');
      }
      next();
    }, reject => {
      responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
    });
  },
  GetAll: function(req, res, next) {
    modelCatalog.asyncGetAll().then(x => {
      if (x.statusCode == enums.STATUS_ITEM.ERROR) {
        responseutil.Send(res, 400, '', x.message, '', '', '');
      }
      responseutil.Send(res, 200, x, '', '', '', '');

    }, reject => {
      responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
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

    modelCatalog.asyncCreate(catalogObj).then(result => {
      if (result == enums.STATUS_ITEM.EXISTE) {
        responseutil.Send(res, 400, JSON.stringify({
          message: 'Item Existente'
        }), '', '', '', '');
      } else {
        responseutil.Send(res, 200, result, '', '', '', '');
        next();
      }
    }, reject => {
      responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
    });
  }


  // Delete: function(req, res, next) {
  //   let objCatalogDetails = {
  //     _id: req.body._id,
  //     maker: req.body.maker
  //   };
  //   model.asyncDelete(objCatalogDetails).then(x => {
  //     console.dir(x);
  //     (x == 0) ? responseutil.Send(res, 400, '', 'No se logro borrar', '', ''): responseutil.Send(res, 200, '', 'Borrado con exito', '', '');
  //     next();
  //   });
  // },
  // Update: function(req, res, next) {
  //   const objCatalogDetails = {
  //     _id: req.body._id,
  //     maker: req.body.maker,
  //     field0: req.body.name,
  //     status_item: req.body.status_item
  //   };

  //   model.asyncUpdate(objCatalogDetails).then(x => {
  //     console.dir(x);
  //     (x == 0) ? responseutil.Send(res, 400, '', 'No se logro modificar', '', ''): responseutil.Send(res, 200, '', 'Modificado con exito', '', '');
  //     next();
  //   });

  // }

}