const catalogEntity = require('../entities/catalogs.entity');
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util')
const Promise = require('promise');

module.exports = {
	asyncPatch: function(catalogObj) {
		const promesa = new Promise(function(resolve, reject) {
			try {
				const datetmp = enums.DateTimeNowToMilliSeconds();
				let query = catalogEntity.findOneAndUpdate({
					'_id': catalogObj.id
				}, {
					'status_item': catalogObj.status_item,
					'modification_date': datetmp,
					'table_name': catalogObj.table_name,
					'row_order': catalogObj.row_order
				}, function(error, res) {
					if (error) {
						reject({
							statusCode: enums.STATUS_ITEM.ERROR,
							message: error.message
						});
					}

					if (res == null || typeof(res._doc) == 'undefined') {
						resolve(enums.STATUS_ITEM.INCIDENCIA);
					} else {
						resolve({
							statusCode: enums.STATUS_ITEM.OKNOCONTENT,
							message: ''
						});
					}
				});
			} catch (error) {
				if (error) {
					reject({
						statusCode: enums.STATUS_ITEM.ERROR,
						message: error.message
					});
				}
			}
		});
		return promesa;
	},
	asynGet: function(catalogObj) {
		let promesa = new Promise(function(resolve, reject) {
			try {

				const query = catalogEntity.find({
					'_id': catalogObj.id
				});

				query.exec(function(error, docs) {
					if (error) {
						// console.log('query.exec');
						//console.dir(error);
						reject({
							statusCode: enums.STATUS_ITEM.ERROR,
							message: error.message
						});
					}

					// console.dir(docs);
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
	asyncGetAll: function() {
		let promesa = new Promise(function(resolve, reject) {
			try {
				const query = catalogEntity.find({});
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
	asyncCreate: function(catalogObj) {
		let promesa = new Promise(function(resolve, reject) {
			try {

				const query = catalogEntity.find({
					'table_name': catalogObj.table_name
				});

				query.exec(function(err, docs) {
					let tmprow = 0;

					if (error) {
						reject({
							statusCode: enums.STATUS_ITEM.ERROR,
							message: error.message
						});
					}

					if (docs.length >= 1) {
						resolve(enums.STATUS_ITEM.EXISTE);
					} else {

						// get max value id_table
						const querygetmax = catalogEntity.findOne({
							status_item: true
						}).sort('-id_table');

						querygetmax.exec(function(err, docgetmax) {
							if (err) {
								resolve(-1);
							}
							tmprow = parseInt(docgetmax.id_table) + 1;
							const datetmp = enums.DateTimeNowToMilliSeconds();

							let catalog = catalogEntity({
								status_item: true,
								create_date: datetmp,
								modification_date: 0,
								id_table: tmprow, // buscar como obtener maximo
								table_name: catalogObj.table_name,
								row_order: tmprow
							});

							catalog.save(function(err) {

								if (err) {
									resolve({
										statusCode: 400,
										message: err.message
									});
								} else {
									resolve(JSON.stringify(catalog, null));
								}
							});
						})
					}
					// ? resolve(docs[0]._doc) : resolve(0);
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

	//	asyncCheckExist: function(catalogObj) {
	//		return new Promise(function(resolve, reject) {
	//			try {
	//				let query = usermodel.findOne({
	//					'email': catalogObj.email,
	//					'password': catalogObj.password
	//				}, '_id id_item', function(err, res) {
	//					if (err) return err;
	//
	//					if (res == null) {
	//						console.log('null = 0');
	//						resolve(0);
	//					} else {
	//						// console.log(' = 1');
	//						const result = (res._doc) ? 1 : 0;
	//						resolve(result);
	//					}
	//				});
	//
	//			} catch (error) {
	//				reject(error);
	//			}
	//		});
	//	},


}