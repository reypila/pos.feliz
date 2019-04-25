const receiptEntity = require('../entities/receipts.entity');
const enums = require('../util/enum.util');
const Promise = require('promise');

module.exports = {
	asyncDelete: function(receiptObject) {
		let promesa = new Promise(function(resolve, reject) {
			try {
				// start
				let query = receiptEntity.findOneAndUpdate({
					'_id': receiptObject.id
				}, {
					status_item_id: enums.STATUS_ITEM.DELETE,
					modification_date: receiptObject.modification_date
				}, {
					new: true
				}, function(error, docs) {
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
					resolve({
						statusItem: enums.STATUS_ITEM.SUCCESS,
						statusCode: enums.HTTP_STATUS_CODE.OK,
						result: JSON.stringify(docs, null),
						message: '',
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
	asyncPatch: function(receiptObject) {
		let promesa = new Promise(function(resolve, reject) {
			try {

				let query = receiptEntity.findOneAndUpdate({
					'_id': receiptObject.id
				}, {
					item_order: receiptObject.item_order,
					status_item_id: receiptObject.status_item_id,
					maker: receiptObject.maker,
					modification_date: receiptObject.modification_date,
					client_id: receiptObject.client_id,
					subtotal: receiptObject.subtotal,
					total: receiptObject.total,
					voided: receiptObject.voided // anulado
				}, {
					new: true
				}, function(error, docs) {
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
					resolve({
						statusItem: enums.STATUS_ITEM.SUCCESS,
						statusCode: enums.HTTP_STATUS_CODE.OK,
						result: JSON.stringify(docs, null),
						message: '',
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
	asyncGetAll: function() {
		let promesa = new Promise(function(resolve, reject) {
			try {
				const query = receiptEntity.find({});
				query.exec(function(error, docs) {
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
	asyncGet: function(receiptObject) {
		let promesa = new Promise(function(resolve, reject) {
			try {
				let query = {};

				if (enums.CheckExist(receiptObject.id)) {
					query = receiptEntity.find({
						'_id': receiptObject.id
					});
				} else {
					query = receiptEntity.find({
						'client_id': receiptObject.client_id
					});
				}

				query.exec(function(error, docs) {
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

					resolve({
						statusItem: enums.STATUS_ITEM.SUCCESS,
						statusCode: enums.HTTP_STATUS_CODE.OK,
						result: JSON.stringify(docs),
						message: '',
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
	asyncCreate: function(receiptObject) {
		let promesa = new Promise(function(resolve, reject) {
			try {
				// get max value id_table
				const querygetmax = receiptEntity.findOne({}).sort('-item_order');

				querygetmax.exec(function(error, docgetmax) {
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

					let receipt = receiptEntity({
						item_order: tmprow,
						status_item_id: enums.STATUS_ITEM.ACTIVO,
						maker: receiptObject.maker,
						create_date: receiptObject.create_date,
						modification_date: receiptObject.modification_date,
						client_id: receipt.client_id,
						subtotal: receipt.subtotal,
						total: receipt.total,
						voided: receipt.voided, // anulado
						product_id: receipt.product_id
					});

					receipt.save(function(error) {
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
								result: JSON.stringify(receipt),
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