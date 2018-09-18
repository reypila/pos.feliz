const productEntity = require('../entities/products.entity');
const rowsEntity = require('../entities/catalogdetails.entity');
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util')
const Promise = require('promise');

module.exports = {
	asyncGetAll: function () {
		let promesa = new Promise(function (resolve, reject) {
			try {
				const query = productEntity.find({});
				query.exec(function (error, docs) {
					if (error) {
						reject({
							statusItem: enums.STATUS_ITEM.INCIDENCIA,
							statusCode: enums.HTTP_STATUS_CODE.BAD_REQUEST,
							result: '',
							message: error.message,
							href: '',
							function: ''
						});
					}
					// console.dir(docs);
					docs.length >= 1 ? resolve({
						statusItem: enums.STATUS_ITEM.EXISTE,
						statusCode: enums.HTTP_STATUS_CODE.OK,
						result: JSON.stringify(docs, null),
						message: '',
						href: '',
						function: ''
					}) : resolve({
						statusItem: enums.STATUS_ITEM.INEXISTENTE,
						statusCode: enums.HTTP_STATUS_CODE.NO_CONTENT,
						result: '',
						message: 'No se encontraron items',
						href: '',
						function: ''
					});
				});
			} catch (error) {
				reject({
					statusItem: enums.STATUS_ITEM.INCIDENCIA,
					statusCode: enums.HTTP_STATUS_CODE.BAD_REQUEST,
					result: '',
					message: error.message,
					href: '',
					function: ''
				});
			}
		});
		return promesa;
	},
	asyncGet: function (productObject) {
		let promesa = new Promise(function (resolve, reject) {
			try {
				let query = {};

				if (enums.CheckExist(productObject.id)) {
					query = productEntity.find({
						'_id': productObject.id
					});
				} else {
					query = productEntity.find({
						'name': productObject.name,
						'brand': productObject.brand
					});
				}

				query.exec(function (error, docs) {
					if (error) {
						reject({
							statusItem: enums.STATUS_ITEM.INCIDENCIA,
							statusCode: enums.HTTP_STATUS_CODE.BAD_REQUEST,
							result: '',
							message: error.message,
							href: '',
							function: ''
						});
					}
//					console.dir(docs);

					docs.length >= 1 ? resolve({
						statusItem: enums.STATUS_ITEM.EXISTE,
						statusCode: enums.HTTP_STATUS_CODE.OK,
						result: JSON.stringify(docs, null),
						message: 'Existe item',
						href: '',
						function: ''
					}) : resolve({
						statusItem: enums.STATUS_ITEM.INEXISTENTE,
						statusCode: enums.HTTP_STATUS_CODE.NO_CONTENT,
						result: '',
						message: 'No existe item',
						href: '',
						function: ''
					});
				});
			} catch (error) {
				reject({
					statusItem: enums.STATUS_ITEM.INCIDENCIA,
					statusCode: enums.HTTP_STATUS_CODE.BAD_REQUEST,
					result: '',
					message: error.message,
					href: '',
					function: ''
				});
			}
		});

		return promesa;
	},
	asyncCreate: function (productObject) {
		let promesa = new Promise(function (resolve, reject) {
			try {
				// get max value id_table
				const querygetmax = productEntity.findOne({
					status_item_id: enums.STATUS_ITEM.ACTIVO
				}).sort('-item_order');

				querygetmax.exec(function (error, docgetmax) {
					if (error) {
						reject({
							statusItem: enums.STATUS_ITEM.INCIDENCIA,
							statusCode: enums.HTTP_STATUS_CODE.BAD_REQUEST,
							result: '',
							message: error.message,
							href: '',
							function: ''
						});
					}

					let tmprow = 0;

					if (enums.CheckExist(docgetmax)) {
						tmprow = parseInt(docgetmax.item_order) + 1;
					}

					const datetmp = enums.DateTimeNowToMilliSeconds();

					let product = productEntity({
						item_order: tmprow,
						status_item_id: enums.STATUS_ITEM.ACTIVO,
						maker: productObject.maker,
						create_date: productObject.create_date,
						modification_date: productObject.modification_date,
						name: productObject.name,
						barcode: productObject.barcode,
						weight: productObject.weight,
						size: productObject.size,
						stock: productObject.stock,
						brand: productObject.brand,
						cost: productObject.cost,
						price: productObject.price,
						pick_url: productObject.pick_url
					});

					product.save(function (error) {

						if (error) {
							reject({
								statusItem: enums.STATUS_ITEM.INCIDENCIA,
								statusCode: enums.HTTP_STATUS_CODE.BAD_REQUEST,
								result: '',
								message: error.message,
								href: '',
								function: ''
							});
						} else {
							resolve({
								statusItem: enums.STATUS_ITEM.ACTIVO,
								statusCode: enums.HTTP_STATUS_CODE.OK,
								result: JSON.stringify(product, null),
								message: '',
								href: '',
								function: ''
							});
						}
					});
				});

			} catch (error) {
				reject({
					statusItem: enums.STATUS_ITEM.INCIDENCIA,
					statusCode: enums.HTTP_STATUS_CODE.BAD_REQUEST,
					result: '',
					message: error.message,
					href: '',
					function: ''
				});
			}
		});
		return promesa;
	}

}