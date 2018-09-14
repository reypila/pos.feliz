const enums = require('../util/enum.util');
const Promise = require("promise");
const responseutil = require('../util/response.util');
const productModel = require('../models/products.model');


module.exports = {
	DataDelete: function(req, res, next) {
		const requestObject = {
			id: req.params.catalogid
		};
		productModel.asyncDataDelete(requestObject).then(resolve => {
			if (resolve.statusCode == enums.STATUS_ITEM.ERROR) {
				responseutil.Send(res, 400, '', resolve.message, '', '', '');
			}
			responseutil.Send(res, 200, resolve, '', '', '', '');

		}, reject => {
			responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
		});
	},
	DataGetAll: function(req, res, next) {
		productModel.asyncDataAll().then(resolve => {
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

		productModel.asynDataPatch(requestObject).then(result => {
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

		productModel.asynDataGet(requestObject).then(result => {
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
	DataAdd: function(req, res, next) {
		// body...
		if (!enums.CheckExist(req.params.catalogid) ||
			!enums.CheckExist(req.body.status_item) ||
			!enums.CheckExist(req.body.row_order)) {
			responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required property not set id, catalogid, status_item, row_order', '', '', '');
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

		productModel.asyncDataAdd(requestObject).then(resolve => {
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

		productModel.asyncDelete(requestObject).then(resolve => {
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
			console.dir(x);
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

		productModel.asyncPatch(requestObject).then(resolve => {
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
		productModel.asynGet(objcatalogdetails).then(result => {
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
		productModel.asyncGetAll().then(x => {
			if (x.statusCode == enums.STATUS_ITEM.ERROR) {
				responseutil.Send(res, 400, '', x.message, '', '', '');
			}
			responseutil.Send(res, 200, x, '', '', '', '');

		}, reject => {
			responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
		});
	},
	Create: function(req, res, next) {
		// validate must arguments
		if (!enums.CheckExist(req.body.price) ||
			!enums.CheckExist(req.body.cost) ||
			!enums.CheckExist(req.body.brand) ||
			!enums.CheckExist(req.body.stock) ||
			!enums.CheckExist(req.body.name) ||
			!enums.CheckExist(req.body.maker)) {
			responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required body parameters not set price,cost,brand,stock,name or maker', '', '', '');
			next();
		}

		const tmp_product_name = req.body.name.toUpperCase();
		const tmp_product_brand = req.body.brand.toUpperCase();

		const datetmp = enums.DateTimeNowToMilliSeconds();

		let productObject = {
			status_item_id: enums.STATUS_ITEM.ACTIVO,
			maker: req.body.maker,
			create_date: datetmp,
			modification_date: 0,
			name: tmp_product_name,
			barcode: '000000000000',
			weight: '0',
			size: '0',
			stock: req.body.stock,
			brand: tmp_product_brand,
			cost: req.body.cost,
			price: req.body.price,
			pick_url: req.body.pick_url
		};

		// check if no exist
		productModel.asyncGet(productObject).then(result => {
			if (result.statusCode == enums.STATUS_ITEM.EXISTE) {
				responseutil.Send(res, enums.STATUS_ITEM.CONFLICT, result.message, '', '', '', '');
				next();
			} else {
				// create product
				productModel.asyncCreate(productObject).then(result2 => {
					if (result2.statusCode == enums.STATUS_ITEM.OK) {
						responseutil.Send(res, enums.STATUS_ITEM.OK, result2.message, '', '', '', '');
					} else {
						responseutil.Send(res, enums.STATUS_ITEM.CONFLICT, result2.message, '', '', '', '');
						next();
					}
				}, reject2 => {
					responseutil.Send(res, reject2.statusCode, '', reject2.message, '', '', '');
					next();
				});
			}
		}, reject => {
			responseutil.Send(res, reject.statusCode, '', reject.message, '', '', '');
		});
	}
}