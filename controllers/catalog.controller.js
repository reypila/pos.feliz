const enums = require('../util/enum.util');
const Promise = require("promise");
const responseutil = require('../util/response.util');
const modelCatalog = require('../models/catalogs.model');

module.exports = {
  Create: function(req, res, next) {
    let catalogObj = {
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
      column20: req.body.column20,
      table_name: req.body.table_name,
      option: req.body.option
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