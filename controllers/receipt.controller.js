const enums = require('../util/enum.util');
const Promise = require("promise");
const responseutil = require('../util/response.util');
const productModel = require('../models/receipt.model');

module.exports = {
	Delete: function(req, res, next) {

		if (!enums.CheckExist(req.params.id))
			responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required body parameters not set id', '', '', '');

		const datetmp = enums.DateTimeNowToMilliSeconds();

		let productObject = {
			id: req.params.id,
			modification_date: datetmp
		}

		productModel.asyncDelete(productObject).then(resolve => {
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
			!enums.CheckExist(req.body.measurement_unit_id) ||
			!enums.CheckExist(req.body.price) ||
			!enums.CheckExist(req.body.cost) ||
			!enums.CheckExist(req.body.brand) ||
			!enums.CheckExist(req.body.stock) ||
			!enums.CheckExist(req.body.name) ||
			!enums.CheckExist(req.body.maker)) {
			responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required body parameters not set item_order,  maker, name, stock, brand, cost, price, measurement_unit_id', '', '', '');
		}

		const tmp_product_name = req.body.name.toUpperCase();
		const tmp_product_brand = req.body.brand.toUpperCase();

		const datetmp = enums.DateTimeNowToMilliSeconds();

		let productObject = {
			id: req.params.id,
			item_order: req.body.item_order,
			status_item_id: req.body.status_item_id,
			maker: req.body.maker,
			// create_date: datetmp,
			modification_date: datetmp,
			name: tmp_product_name,
			barcode: req.body.barcode,
			weight: req.body.weight,
			size: req.body.size,
			stock: req.body.stock,
			brand: tmp_product_brand,
			cost: req.body.cost,
			price: req.body.price,
			pick_url: req.body.pick_url,
			description: req.body.description,
			measurement_unit_id: req.body.measurement_unit_id,
		};

		productModel.asyncPatch(productObject).then(resolve => {
			responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
			next();
		}, reject => {
			responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
			next();
		});
	},
	GetAll: function(req, res, next) {
		productModel.asyncGetAll().then(resolve => {
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

		productModel.asyncGet(objcatalogdetails).then(resolve => {
			responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
			next();

		}, reject => {
			responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
			next();

		});
	},
	Create: function(req, res, next) {
		// validate must arguments
		if (!enums.CheckExist(req.body.measurement_unit_id) ||
			!enums.CheckExist(req.body.price) ||
			!enums.CheckExist(req.body.cost) ||
			!enums.CheckExist(req.body.brand) ||
			!enums.CheckExist(req.body.stock) ||
			!enums.CheckExist(req.body.name) ||
			!enums.CheckExist(req.body.maker)) {
			responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required body parameters not set maker, name, stock, brand, cost, price, measurement_unit_id', '', '', '');
		}

		const tmp_product_name = req.body.name.toUpperCase();
		const tmp_product_brand = req.body.brand.toUpperCase();

		const datetmp = enums.DateTimeNowToMilliSeconds();

		let productObject = {
			status_item_id: parseInt(enums.STATUS_ITEM.ACTIVO),
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
			pick_url: req.body.pick_url,
			description: req.body.description,
			measurement_unit_id: req.body.measurement_unit_id,
		};

		// check if no exist
		productModel.asyncGet(productObject).then(resolve => {
			if (resolve.statusItem == enums.STATUS_ITEM.EXISTE) {
				responseutil.Send(res, enums.HTTP_STATUS_CODE.CONFLICT, resolve.result, resolve.message, resolve.href, resolve.function);
				next();
			} else {
				// create product
				productModel.asyncCreate(productObject).then(resolve2 => {
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