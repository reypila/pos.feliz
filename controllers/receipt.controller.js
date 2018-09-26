const enums = require('../util/enum.util');
const Promise = require("promise");
const responseutil = require('../util/response.util');
const receiptModel = require('../models/receipt.model');

module.exports = {
	DataCreate: function (req,res, next) {
		
	}
	,Delete: function(req, res, next) {

		if (!enums.CheckExist(req.params.id))
			responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required body parameters not set id', '', '', '');

		const datetmp = enums.DateTimeNowToMilliSeconds();

		let receiptObject = {
			id: req.params.id,
			modification_date: datetmp
		}

		receiptModel.asyncDelete(receiptObject).then(resolve => {
			responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
			next();
		}, reject => {
			responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
			next();
		});

	},
	Patch: function(req, res, next) {

		if (!enums.CheckExist(req.params.id) ||
			!enums.CheckExist(req.body.item_order) ||
			!enums.CheckExist(req.body.status_item_id) ||
			!enums.CheckExist(req.body.maker) ||
			!enums.CheckExist(req.body.client_id) ||
			!enums.CheckExist(req.body.subtotal) ||
			!enums.CheckExist(req.body.total) ||
			!enums.CheckExist(req.body.voided)
		) {
			responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required body parameters not set item_order,  maker, name, stock, brand, cost, price, measurement_unit_id', '', '', '');
			next();
		}

		const datetmp = enums.DateTimeNowToMilliSeconds();

		let receiptObject = {
			id: req.params.id,
			item_order: req.body.item_order,
			status_item_id: req.body.status_item_id,
			maker: req.body.maker,
			modification_date: datetmp,
			client_id: req.body.client_id,
			subtotal: req.body.subtotal,
			total: req.body.total,
			voided: req.body.voided // pago anulado
		};

		receiptModel.asyncPatch(receiptObject).then(resolve => {
			responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
			next();
		}, reject => {
			responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
			next();
		});
	},
	GetAll: function(req, res, next) {
		receiptModel.asyncGetAll().then(resolve => {
			responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
			next();
		}, reject => {
			responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
			next();
		});
	},
	Get: function(req, res, next) {

		const objcatalogdetails = {
			id: req.params.id
		};

		receiptModel.asyncGet(objcatalogdetails).then(resolve => {
			responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
			next();

		}, reject => {
			responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
			next();

		});
	},
	Create: function(req, res, next) {
		// validate must arguments
		if (!enums.CheckExist(req.body.maker) ||
			!enums.CheckExist(req.body.client_id) ||
			!enums.CheckExist(req.body.subtotal) ||
			!enums.CheckExist(req.body.total) ||
			!enums.CheckExist(req.body.voided)) {
			responseutil.Send(res, enums.STATUS_ItotalTEM.BADREQUEST, '', 'Required body parameters not set maker, client_id, subtotal, voided ', '', '', '');
		}

	
		const datetmp = enums.DateTimeNowToMilliSeconds();

		let receiptObject = {
			status_item_id: parseInt(enums.STATUS_ITEM.ACTIVO),
			maker: req.body.maker,
			create_date: datetmp,
			modification_date: 0,
			client_id: req.body.client_id,
			subtotal: req.body.subtotal,
			total: req.body.total,
			voided: req.body.voided // compra anulada
		};

		// check if no exist
		receiptModel.asyncGet(receiptObject).then(resolve => {
			if (resolve.statusItem == enums.STATUS_ITEM.EXISTE) {
				responseutil.Send(res, enums.HTTP_STATUS_CODE.CONFLICT, resolve.result, resolve.message, resolve.href, resolve.function);
				next();
			} else {
				// create receipt
				receiptModel.asyncCreate(receiptObject).then(resolve2 => {
					responseutil.Send(res, resolve2.statusCode, resolve2.result, resolve2.message, resolve2.href, resolve2.function);
				}, reject2 => {
					responseutil.Send(res, reject2.statusCode, reject2.result, reject2.message, reject2.href, reject2.function);
					next();
				});
			}
		}, reject => {
			responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
			next();
		});
	}
}