const catalogEntity = require('../entities/catalogs.entity');
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util')
const Promise = require('promise');

module.exports = {
	asyncGetAll: function () {
		let promesa = new Promise(function (resolve, reject) {
			try {
				const query = catalogEntity.find({});
				query.exec(function (err, docs) {
					if (err) {
						reject({ statusCode: enums.STATUS_ITEM.ERROR, message: err });
					}
					docs.length >= 1 ? resolve(docs) : resolve(0);
				});
			} catch (error) {
				// console.log('AQUI HAY UN ERROR' + error);
				// 	resolve({statusCode:enums.STATUS_ITEM.ERROR, message: err });
				reject(enums.STATUS_ITEM.ERROR);
			}
		});
		return promesa;
	},
	asyncCreate: function (catalogObj) {
		let promesa = new Promise(function (resolve, reject) {
			try {

				const query = catalogEntity.find({
					'table_name': catalogObj.table_name
				});


				query.exec(function (err, docs) {
					let tmprow = 0;

					if (err) {
						resolve(-1);
					}

					if (docs.length >= 1) {
						resolve(enums.STATUS_ITEM.EXISTE);
					} else {

						// get max value id_table
						const querygetmax = catalogEntity.findOne({
							status_item: true
						}).sort('-id_table');

						querygetmax.exec(function (err, docgetmax) {
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

							catalog.save(function (err) {

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
				// console.dir(error);
				console.log('AQUI HAY UN ERROR' + error);
				reject(error);
			}
		});
		return promesa;
	}
	//	,
	//	asyncGetAll: function() {
	//		return new Promise(function(resolve, reject) {
	//			try {
	//				const query = usermodel.find({});
	//				query.exec(function(err, docs) {
	//					if (err) {
	//						resolve(-1);
	//					}
	//					docs.length >= 1 ? resolve(docs) : resolve(0);
	//				});
	//			} catch (error) {
	//				console.log('AQUI HAY UN ERROR' + error);
	//				reject(error);
	//			}
	//		});
	//	},
	//	asyncCheckExist: function(objuser) {
	//		return new Promise(function(resolve, reject) {
	//			try {
	//				let query = usermodel.findOne({
	//					'email': objuser.email,
	//					'password': objuser.password
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
	//	asynGetByID: function(objuser) {
	//		// console.dir(objuser);
	//		return new Promise(function(resolve, reject) {
	//			try {
	//				const query = usermodel.find({
	//					'_id': objuser._id
	//				});
	//				query.exec(function(err, docs) {
	//					if (err) {
	//						resolve(-1);
	//					}
	//					docs.length >= 1 ? resolve(docs[0]._doc) : resolve(0);
	//				});
	//			} catch (error) {
	//				console.log('AQUI HAY UN ERROR' + error);
	//				reject(error);
	//			}
	//		});
	//	},
	//	asyncSet: function(objuser) {
	//		return new Promise(function(resolve, reject) {
	//			try {
	//				let query = usermodel.findOneAndUpdate({
	//					'_id': objuser._id
	//				}, {
	//					'status_item': objuser.status_item,
	//					'maker': objuser.maker,
	//					'modification_date': new Date(),
	//					'password': objuser.password,
	//					'name': objuser.name,
	//					'lastname': objuser.lastname,
	//					'lastname2': objuser.lastname,
	//					'alternatemail': objuser.alternatemail,
	//					'birthday': objuser.birthday,
	//					'rfc': objuser.rfc,
	//					'curp': objuser.curp,
	//					'genre': objuser.genre,
	//					'zipcode': objuser.zipcode,
	//					'home_reference': objuser.home_reference,
	//					'apartment_number': objuser.apartment_number,
	//					'telephone_number': objuser.telephone_number,
	//					'telephone_number2': objuser.telephone_number2
	//				}, function(err, res) {
	//					if (err) return err;
	//					if (res == null || typeof(res._doc) == 'undefined') {
	//						resolve(enums.STATUS_ITEM.INCIDENCIA);
	//					} else {
	//						resolve(enums.STATUS_ITEM.OK);
	//					}
	//				});
	//			} catch (ex) {
	//				reject(ex);
	//			}
	//		});
	//	}
}