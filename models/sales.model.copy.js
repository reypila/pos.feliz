const Promise = require('promise');
const salesEntity = require('../entities/sales.entity');
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util')


module.exports = {
    asyncDelete: function (objectSale) {
        const promesa = new Promise(function (resolve, reject) {
            try {

                let query = salesEntity.findOneAndUpdate({
                    '_id': objectSale.id
                }, {
                        'status_item': objectSale.status_item,
                        'modification_date': objectSale.modification_date,
                        'maker': objectSale.maker
                    }, {
                        new: true
                    }, function (error, res) {
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

                        if (!enums.CheckExist(res._doc)) {
                            reject({
                                statusItem: enums.STATUS_ITEM.INCIDENCIA,
                                statusCode: enums.HTTP_STATUS_CODE.BAD_REQUEST,
                                result: ` No found item ${objectSale.id}`,
                                message: '',
                                href: '',
                                function: ''
                            });
                        } else {
                            resolve({
                                statusItem: enums.STATUS_ITEM.SUCCESS,
                                statusCode: enums.HTTP_STATUS_CODE.OK,
                                result: JSON.stringify(res),
                                message: 'delete',
                                href: '',
                                function: ''
                            });
                        }
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
    asyncPatch: function (objectSale) {
        const promesa = new Promise(function (resolve, reject) {
            try {

                let query = salesEntity.findOneAndUpdate({
                    '_id': objectSale.id
                }, {
                        'status_item': objectSale.status_item,
                        'modification_date': objectSale.modification_date,
                        'maker': objectSale.maker,
                        'product_code': objectSale.product_code,
                        'barcode': objectSale.barcode,
                        'description': objectSale.description,
                        'items_current': objectSale.items_current,
                        'items_entries': objectSale.items_entries,
                        'items_outgoings': objectSale.items_outgoings,
                        'items_stock': objectSale.items_stock
                    }, {
                        new: true
                    }, function (error, res) {
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

                        if (!enums.CheckExist(res._doc)) {
                            reject({
                                statusItem: enums.STATUS_ITEM.INCIDENCIA,
                                statusCode: enums.HTTP_STATUS_CODE.BAD_REQUEST,
                                result: ` No found item ${objectSale.id}`,
                                message: 'set',
                                href: '',
                                function: ''
                            });
                        } else {
                            //console.dir(res);
                            // resolve({
                            //     statusCode: enums.STATUS_ITEM.OKNOCONTENT,
                            //     message: JSON.stringify(res)
                            // });

                            resolve({
                                statusItem: enums.STATUS_ITEM.SUCCESS,
                                statusCode: enums.HTTP_STATUS_CODE.OK,
                                result: JSON.stringify(res),
                                message: '',
                                href: '',
                                function: ''
                            });
                        }
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
    asyncGet: function (objectSale) {
        let promesa = new Promise(function (resolve, reject) {
            try {

                const query = salesEntity.find({
                    '_id': objectSale.id
                });

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

                    resolve({
                        statusItem: enums.STATUS_ITEM.SUCCESS,
                        statusCode: enums.HTTP_STATUS_CODE.OK,
                        result: JSON.stringify(docs),
                        message: 'get x id',
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
    asyncGetAll: function () {
        let promesa = new Promise(function (resolve, reject) {
            try {
                const query = salesEntity.find({});
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
                    resolve({
                        statusItem: enums.STATUS_ITEM.SUCCESS,
                        statusCode: enums.HTTP_STATUS_CODE.OK,
                        result: JSON.stringify(docs),
                        message: 'get all',
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
    asyncCreate: function (objectSale) {
        let promesa = new Promise(function (resolve, reject) {

            try {
                const query = salesEntity.find({
                    ' invoice_number': objectSale.invoice_number
                });

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

                    if (enums.CheckExist(docs)) {
                        resolve({
                            statusItem: enums.STATUS_ITEM.EXISTE,
                            statusCode: enums.HTTP_STATUS_CODE.CONFLICT,
                            result: JSON.stringify(docs),
                            message: '* Folio existente, cambiar folio',
                            href: '',
                            function: ''
                        });
                    }

                    let objectEntity = salesEntity({
                        status_item: objectSale.status_item,
                        create_date: objectSale.create_date,
                        modification_date: objectSale.modification_date,
                        maker: objectSale.maker,
                        invoice_number: objectSale.invoice_number,
                        subtotal: objectSale.subtotal,
                        product_code: objectSale.product_code,
                        iva: objectSale.iva,
                        total: objectSale.total,
                        client: objectSale.client,
                        salesman: objectSale.salesman
                    });

                    objectEntity.save(function (error) {
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
                                statusItem: enums.STATUS_ITEM.SUCCESS,
                                statusCode: enums.HTTP_STATUS_CODE.OK,
                                result: JSON.stringify(objectEntity),
                                message: 'create',
                                href: '',
                                function: ''
                            });

                        }
                    });

                });
            }
            catch (error) {
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