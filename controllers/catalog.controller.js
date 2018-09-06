const enums = require('../util/enum.util');
const Promise = require("promise");
const responseutil = require('../util/response.util');
const modelCatalog = require('../models/catalogs.model');

module.exports = {
  GetAll: function (req, res, next) {
    modelCatalog.asyncGetAll().then(x => {
      if (x.statusCode == enums.STATUS_ITEM.ERROR) {
        responseutil.Send(res, 400, '', x.message, '', '', '');
      }
      responseutil.Send(res, 200, x, '', '', '', '');

    });
  },
  Create: function (req, res, next) {

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
    });
  }

  // GetById: function(req, res, next) {
  //   const objcatalogdetails = {
  //     uid: req.params.id
  //   };

  //   model.asyncFindById(objcatalogdetails).then(result => {
  //     if (result == 0) {
  //       responseutil.Send(res, 400, '', 'no se encontro ninguna cateroria con ese nombre', '')
  //     } else {
  //       let category = {
  //         _id: result._id,
  //         id: result.row,
  //         name: result.field0,
  //         status_item: result.status_item,
  //         maker: result.maker,
  //         create_date: result.create_date,
  //         modification_date: result.modification_date
  //       }
  //       responseutil.Send(res, 200, category, '', '');
  //     }
  //     next();
  //   });
  // },
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