const catalogEntity = require('../entitys/catalogs.entity');
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util')
const Promise = require('promise');

module.exports = {

	asyncCreate: function(catalogObj) {
		let promesa = new Promise(function(resolve, reject) {
			// body...
			try {
				// console.dir(catalogObj);

				// if option is table get max value row plus one 

				const query = catalogEntity.find({
					'table_name': catalogObj.table_name
				});



				query.exec(function(err, docs) {
					let tmprow = 0;

					if (err) {
						resolve(-1);
					}

					// if (catalogObj.option == enums.CATALOGS.TABLA_OPTION) {
					// 		tmprow = parseInt(docs.row) + 1;
					// 	}

					if (docs.length >= 1 && catalogObj.option == enums.CATALOGS.TABLA_OPTION) {
						resolve(enums.STATUS_ITEM.EXISTE);
					}

					if (docs.length >= 1 && catalogObj.option == enums.CATALOGS.ROW_OPTION) {
						
						const datetmp = enums.DateTimeNowToMilliSeconds();
						tmprow = parseInt(docs.row) + 1;

						let catalog = catalogEntity({
							status_item: true,
							create_date: datetmp,
							modification_date: 0,
							id_table: 0, // buscar como obtener maximo
							table_name: catalogObj.table_name,
							row: tmprow,
							column0: catalogObj.column0,
							column1: catalogObj.column1,
							column2: catalogObj.column2,
							column3: catalogObj.column3,
							column4: catalogObj.column4,
							column5: catalogObj.column5,
							column6: catalogObj.column6,
							column7: catalogObj.column7,
							column8: catalogObj.column8,
							column9: catalogObj.column9,
							column10: catalogObj.column10,
							column11: catalogObj.column11,
							column12: catalogObj.column12,
							column13: catalogObj.column13,
							column14: catalogObj.column14,
							column15: catalogObj.column15,
							column16: catalogObj.column16,
							column17: catalogObj.column17,
							column18: catalogObj.column18,
							column19: catalogObj.column19,
							column20: catalogObj.column20
						});

						catalog.save(function(err) {

							if (err) {
								resolve({
									statusCode: 400,
									message: err.message
								});
								// responseutil.Send(res, 400, '', err.message, '', '', '');
							} else {
								//responseutil.Send(res, 200, JSON.stringify(catalog), '', '', '');
								resolve(JSON.stringify(catalog, null));
							}
						});
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