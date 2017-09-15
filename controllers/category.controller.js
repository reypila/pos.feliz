const Promise = require("promise");
const responseutil = require('../util/response.util');
const model = require('../models/category.model');

module.exports = {
  GetById: function (req, res, next) {

    const objcatalogdetails = {
      uid: req.params.id
    };

    model.asyncFindById(objcatalogdetails).then(result => {
      if (result == 0) {
        responseutil.Send(res, 400, '', 'no se encontro ninguna cateroria con ese nombre', '')
      } else {
        let category = {
          _id: result._id,
          id: result.row,
          name: result.field0,
          status_item: result.status_item,
          maker: result.maker,
          create_date: result.create_date,
          modification_date: result.modification_date
        }
        responseutil.Send(res, 200, category, '', '');
      }
      next();
    });
  },

  Create: function (req, res, next) {
    let objCatalogDetails = {
      maker: req.body.maker,
      name: req.body.name
    };

    model.asyncCheckExist(objCatalogDetails).then(result => {
      if (result == 0) {
        model.asyncNext().then(resultII => {
          objCatalogDetails.row = resultII;
          model.asyncCreate(objCatalogDetails).then(resultIII => {
            if (resultIII != -100) {
              responseutil.Send(res, 200, JSON.stringify(resultIII), '', 'Categoría sucess', '', '');
            } else {
              responseutil.Send(res, 400, JSON.stringify(resultIII), '', 'error', '', '');
              next();
            }
          });
        });
      } else {
        responseutil.Send(res, 400, '', '', 'Categoria ya existe', '');
      }
    });
  },
  Delete: function (req, res, next) {
    let objCatalogDetails = {
      _id: req.body._id,
      maker: req.body.maker
    };
    model.asyncDelete(objCatalogDetails).then(x => {
      console.dir(x);
      (x == 0) ? responseutil.Send(res, 400, '', 'No se logro borrar', '', '') : responseutil.Send(res, 200, '', 'Borrado con exito', '', '');
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
      console.dir(x);
      (x == 0) ? responseutil.Send(res, 400, '', 'No se logro modificar', '', '') : responseutil.Send(res, 200, '', 'Modificado con exito', '', '');
      next();
    });

  }

}