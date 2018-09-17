const productEntity = require('../entities/products.entity');
const rowsEntity = require('../entities/catalogdetails.entity');
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util')
const Promise = require('promise');

module.exports = {
	asyncGet: function(productObject) {
		let promesa = new Promise(function(resolve, reject) {
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

				query.exec(function(error, docs) {
					if (error) {
						reject({
							statusCode: enums.STATUS_ITEM.BADREQUEST,
							result: '',
							message: error.message,
							href: '',
							function: ''
						});
					}
					// console.dir(docs);

					docs.length >= 1 ? resolve({
						statusCode: enums.STATUS_ITEM.EXISTE,
						result: JSON.stringify(docs, null),
						message: 'Existe item',
						href: '',
						function: ''
					}) : resolve({
						statusCode: enums.STATUS_ITEM.NOTFOUND,
						result: '',
						message: 'Existe item',
						href: '',
						function: ''
					});
				});
			} catch (error) {
				reject({
					statusCode: enums.STATUS_ITEM.BADREQUEST,
					result: '',
					message: error.message,
					href: '',
					function: ''
				});
			}
		});

		return promesa;
	},
	asyncCreate: function(productObject) {
		let promesa = new Promise(function(resolve, reject) {
			try {
				// get max value id_table
				const querygetmax = productEntity.findOne({
					status_item_id: enums.STATUS_ITEM.ACTIVO
				}).sort('-item_order');

				querygetmax.exec(function(error, docgetmax) {
					if (error) {
						reject({
							statusCode: enums.STATUS_ITEM.BADREQUEST,
							result: '',
							message: error.message,
							href: '',
							function: ''
						});
					}

					let tmprow = 0;
					console.log('----------------------------------------------');
					 console.dir(docgetmax);
					console.log('----------------------------------------------');

					if (enums.CheckExist(docgetmax)) {
						tmprow = parseInt(docgetmax._doc.item_order) + 1;
					}

					const datetmp = enums.DateTimeNowToMilliSeconds();

					let product = productEntity({
						item_order: tmprow,
						status_item_id: datetmp,
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

					product.save(function(error) {

						if (error) {
							reject({
								statusCode: enums.STATUS_ITEM.BADREQUEST,
								result: '',
								message: error.message,
								href: '',
								function: ''
							});
						} else {
							resolve({
								statusCode: enums.STATUS_ITEM.OK,
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
					statusCode: enums.STATUS_ITEM.BADREQUEST,
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