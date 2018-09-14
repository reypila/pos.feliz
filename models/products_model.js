const productEntity = require('../entities/products.entity');
const rowsEntity = require('../entities/catalogdetails.entity');
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util')
const Promise = require('promise');

module.exports = {
	asyncDataDelete: function(requestObject) {
		const promesa = new Promise(function function_name(resolve, reject) {
			try {
				const datetmp = enums.DateTimeNowToMilliSeconds();
				let query = rowsEntity.findOneAndUpdate({
					'_id': requestObject.id
				}, {
					status_item: false,
					modification_date: datetmp,

				}, function(error, res) {
					if (error) {
						reject({
							statusCode: enums.STATUS_ITEM.ERROR,
							message: error.message
						});
					}

					if (!enums.CheckExist(res._doc)) {
						resolve(enums.STATUS_ITEM.INCIDENCIA);
					} else {
						resolve({
							statusCode: enums.STATUS_ITEM.OKNOCONTENT,
							message: JSON.stringify(res)
						});
					}
				});
			} catch (error) {
				reject({
					statusCode: enums.STATUS_ITEM.ERROR,
					message: error.message
				});
			}
		});
		return promesa;
	},
	asyncDataAll: function(requestObject) {
		let promesa = new Promise(function(resolve, reject) {
			try {
				const query = rowsEntity.find({});
				query.exec(function(error, docs) {
					if (error) {
						reject({
							statusCode: enums.STATUS_ITEM.ERROR,
							message: error.message
						});
					}
					docs.length >= 1 ? resolve(docs) : resolve(0);
				});
			} catch (error) {
				reject({
					statusCode: enums.STATUS_ITEM.ERROR,
					message: error.message
				});
			}
		});

		return promesa;
	},
	asynDataPatch: function(requestObject) {
		const promesa = new Promise(function(resolve, reject) {
			try {

				const datetmp = enums.DateTimeNowToMilliSeconds();
				let query = rowsEntity.findOneAndUpdate({
					'_id': requestObject.id
				}, {
					status_item: requestObject.status_item,
					modification_date: datetmp,
					row_order: requestObject.row_order,
					column0: requestObject.column0,
					column1: requestObject.column1,
					column2: requestObject.column2,
					column3: requestObject.column3,
					column4: requestObject.column4,
					column5: requestObject.column5,
					column6: requestObject.column6,
					column7: requestObject.column7,
					column8: requestObject.column8,
					column9: requestObject.column9,
					column10: requestObject.column10,
					column11: requestObject.column11,
					column12: requestObject.column12,
					column13: requestObject.column13,
					column14: requestObject.column14,
					column15: requestObject.column15,
					column16: requestObject.column16,
					column17: requestObject.column17,
					column18: requestObject.column18,
					column19: requestObject.column19,
					column20: requestObject.column20
				}, function(error, res) {
					if (error) {
						reject({
							statusCode: enums.STATUS_ITEM.ERROR,
							message: error.message
						});
					}


					if (!enums.CheckExist(res._doc)) {
						resolve(enums.STATUS_ITEM.INCIDENCIA);
					} else {
						resolve({
							statusCode: enums.STATUS_ITEM.OKNOCONTENT,
							message: JSON.stringify(res)
						});
					}
				});
			} catch (error) {

				reject({
					statusCode: enums.STATUS_ITEM.ERROR,
					message: error.message
				});

			}
		});

		return promesa;
	},
	asynDataGet: function(requestObject) {
		const promesa = new Promise(function(resolve, reject) {
			try {

				const query = rowsEntity.find({
					'_id': requestObject.id
				});

				query.exec(function(error, docs) {
					if (error) {
						reject({
							statusCode: enums.STATUS_ITEM.ERROR,
							message: error.message
						});
					}
					docs.length >= 1 ? resolve(docs) : resolve(enums.STATUS_ITEM.NOTFOUND);
				});

			} catch (error) {
				reject({
					statusCode: enums.STATUS_ITEM.ERROR,
					message: error.message
				});
			}
		});

		return promesa;
	},
	asyncDataAdd: function(requestObject) {
		const promesa = new Promise(function(resolve, reject) {
			// body...
			try {
				// console.dir(requestObject);
				// const datetmp = enums.DateTimeNowToMilliSeconds();
				const datetmp = enums.DateTimeNowToMilliSeconds();

				let rowitem = rowsEntity({
					status_item: true,
					create_date: datetmp,
					modification_date: 0,
					catalogsid: requestObject.catalogsid, // buscar como obtener maximo
					//table_name: productObject.table_name,
					row_order: requestObject.row_order,
					column0: requestObject.column0,
					column1: requestObject.column1,
					column2: requestObject.column2,
					column3: requestObject.column3,
					column4: requestObject.column4,
					column5: requestObject.column5,
					column6: requestObject.column6,
					column7: requestObject.column7,
					column8: requestObject.column8,
					column9: requestObject.column9,
					column10: requestObject.column10,
					column11: requestObject.column11,
					column12: requestObject.column12,
					column13: requestObject.column13,
					column14: requestObject.column14,
					column15: requestObject.column15,
					column16: requestObject.column16,
					column17: requestObject.column17,
					column18: requestObject.column18,
					column19: requestObject.column19,
					column20: requestObject.column20
				});

				console.log('=====================================');
				console.dir(rowitem);


				rowitem.save(function(err) {
					if (err) {
						resolve({
							statusCode: 400,
							message: err.message
						});
					} else {
						resolve(JSON.stringify(rowitem, null));
					}
				});

			} catch (error) {
				reject({
					statusCode: enums.STATUS_ITEM.ERROR,
					message: error.message
				});
			}
		});
		return promesa;
	},
	asyncDelete: function(requestObject) {
		const promesa = new Promise(function function_name(resolve, reject) {
			try {
				const datetmp = enums.DateTimeNowToMilliSeconds();
				let query = productEntity.findOneAndUpdate({
					'_id': requestObject.id
				}, {
					status_item: false,
					modification_date: datetmp,

				}, function(error, res) {
					if (error) {
						reject({
							statusCode: enums.STATUS_ITEM.ERROR,
							message: error.message
						});
					}

					if (!enums.CheckExist(res._doc)) {
						resolve(enums.STATUS_ITEM.INCIDENCIA);
					} else {
						resolve({
							statusCode: enums.STATUS_ITEM.OKNOCONTENT,
							message: JSON.stringify(res)
						});
					}
				});
			} catch (error) {
				reject({
					statusCode: enums.STATUS_ITEM.ERROR,
					message: error.message
				});
			}
		});
	},
	asyncPatch: function(productObject) {
		const promesa = new Promise(function(resolve, reject) {
			try {
				const datetmp = enums.DateTimeNowToMilliSeconds();
				let query = productEntity.findOneAndUpdate({
					'_id': productObject.id
				}, {
					'status_item': productObject.status_item,
					'modification_date': datetmp,
					'table_name': productObject.table_name,
					'row_order': productObject.row_order
				}, function(error, res) {
					if (error) {
						reject({
							statusCode: enums.STATUS_ITEM.ERROR,
							message: error.message
						});
					}

					if (!enums.CheckExist(res._doc)) {
						resolve(enums.STATUS_ITEM.INCIDENCIA);
					} else {
						//console.dir(res);
						resolve({
							statusCode: enums.STATUS_ITEM.OKNOCONTENT,
							message: JSON.stringify(res)
						});
					}
				});
			} catch (error) {

				reject({
					statusCode: enums.STATUS_ITEM.ERROR,
					message: error.message
				});

			}
		});
		return promesa;
	},
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
							statusCode: enums.STATUS_ITEM.ERROR,
							message: error.message
						});
					}

					docs.length >= 1 ? resolve(docs) : resolve({
						statusCode: enums.STATUS_ITEM.NOTFOUND,
						message: 'No existe item'
					});
				});
			} catch (error) {

				reject({
					statusCode: enums.STATUS_ITEM.ERROR,
					message: error.message
				});

			}
		});

		return promesa;
	},
	asyncGetAll: function() {
		let promesa = new Promise(function(resolve, reject) {
			try {
				const query = productEntity.find({});
				query.exec(function(error, docs) {
					if (error) {
						reject({
							statusCode: enums.STATUS_ITEM.ERROR,
							message: error.message
						});
					}
					docs.length >= 1 ? resolve(docs) : resolve(0);
				});
			} catch (error) {
				reject({
					statusCode: enums.STATUS_ITEM.ERROR,
					message: error.message
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

				querygetmax.exec(function(err, docgetmax) {
					if (err) {
						resolve(-1);
					}
					let tmprow = parseInt(docgetmax.id_table) + 1;
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

					product.save(function(err) {

						if (err) {
							resolve({
								statusCode: 400,
								message: err.message
							});
						} else {
							resolve(JSON.stringify(product, null));
						}
					});
				});

			} catch (error) {
				reject({
					statusCode: enums.STATUS_ITEM.ERROR,
					message: error.message
				});
			}
		});
		return promesa;
	}

}