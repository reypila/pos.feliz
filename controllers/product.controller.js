const enums = require('../util/enum.util');
const Promise = require("promise");
const responseutil = require('../util/response.util');
const productModel = require('../models/products.model');


module.exports = {
	GetAll: function (req, res, next) {
		productModel.asyncGetAll().then(result => {
			responseutil.Send(res, result.statusCode, result.result, result.message, result.href, result.function);
			next();
		}, reject => {
			responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
			next();
		});
	},
	Get: function (req, res, next) {

		const objcatalogdetails = {
			id: req.params.id
		};
		productModel.asynGet(objcatalogdetails).then(result => {
			responseutil.Send(res, result.statusCode, result.result, result.message, result.href, result.function);
		}, reject => {
			responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
		});
		next();
	},
	Create: function (req, res, next) {
		// validate must arguments
		if (!enums.CheckExist(req.body.price) ||
			!enums.CheckExist(req.body.cost) ||
			!enums.CheckExist(req.body.brand) ||
			!enums.CheckExist(req.body.stock) ||
			!enums.CheckExist(req.body.name) ||
			!enums.CheckExist(req.body.maker)) {
			responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required body parameters not set price,cost,brand,stock,name or maker', '', '', '');
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
			pick_url: req.body.pick_url
		};

		// check if no exist
		productModel.asyncGet(productObject).then(result => {
			if (result.statusItem == enums.STATUS_ITEM.EXISTE) {
				responseutil.Send(res, enums.HTTP_STATUS_CODE.CONFLICT, result.result, result.message, result.href, result.function);
				next();
			} else {
				// create product
				productModel.asyncCreate(productObject).then(result2 => {
					responseutil.Send(res, result2.statusCode, result2.result, result2.message, result2.href, result2.function);

				}, reject2 => {
					responseutil.Send(res, reject2.statusCode, reject2.result, reject2.message, reject2.href, reject2.function);
					next();
				});
			}
		}, reject => {
			responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
			next();
		});
		// console.log('end next');
		// next();
	}
}