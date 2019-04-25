const Promise = require('promise');
const salesEntity = require('../entities/sales.entity');
const inventoryEntity = require('../entities/inventory.entity');
const inventoryModel = require('../models/inventory.model')
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
                // search invoice
                const query = salesEntity.find({
                    'no_invoice': objectSale.no_invoice
                });

                query.exec(function (error, docs) {

                    if (error) {
                        reject({
                            statusItem: enums.STATUS_ITEM.INCIDENCIA,
                            statusCode: enums.HTTP_STATUS_CODE.BAD_REQUEST,
                            result: '',
                            message: `*Error query function ${error.message}`,
                            href: '',
                            function: 'asyncCreate'
                        });
                    }

                    if (docs.length > 0) {
                        resolve({
                            statusItem: enums.STATUS_ITEM.EXISTE,
                            statusCode: enums.HTTP_STATUS_CODE.CONFLICT,
                            result: JSON.stringify(docs),
                            message: '*Factura existente, elige otra venta',
                            href: '',
                            function: ''
                        });

                    } else {

                        let objectEntity = salesEntity({
                            status_item: objectSale.status_item,
                            create_date: objectSale.create_date,
                            modification_date: objectSale.modification_date,
                            maker: objectSale.maker,
                            no_invoice: objectSale.no_invoice,
                            purchase_date: objectSale.purchase_date,
                            product_code: objectSale.product_code,
                            barcode: objectSale.barcode,
                            description: objectSale.description,
                            quantity: objectSale.quantity,
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

                                // en caso de venta hay que reducir en el almaceo inventarios  menus 1 producto o servicio  


                                let query = inventoryEntity.findOne({
                                    'product_code': objectSale.product_code
                                }, '_id status_item maker items_current items_entries items_outgoings items_stock',
                                    function (error, docs) {
                                        if (error) {
                                            reject({
                                                statusItem: enums.STATUS_ITEM.INCIDENCIA,
                                                statusCode: enums.HTTP_STATUS_CODE.BAD_REQUEST,
                                                result: '',
                                                message: `No existe folio ${error.message}`,
                                                href: '',
                                                function: ''
                                            });
                                        }
                                        // crea conciliacion entre entradas y salidas 
                                        let tmp_outgoings = parseInt(docs._doc.items_outgoings) + parseInt(objectSale.quantity);
                                        let tmp_items_stock = parseInt(docs._doc.items_current) + parseInt(docs._doc.items_entries) - tmp_outgoings;

                                        let tmp_status_item = enums.STATUS_ITEM.ACTIVO
                                        if (tmp_items_stock <= 0) {
                                            tmp_items_stock = enums.STATUS_ITEM.SIN_STOCK;
                                        }

                                        let objectInventory = {
                                            'id': docs._doc._id,
                                            'status_item': tmp_items_stock,
                                            'modification_date': objectSale.modification_date,
                                            'maker': objectSale.maker,
                                            'product_code': objectSale.product_code,
                                            'barcode': objectSale.barcode,
                                            'description': objectSale.description,
                                            'items_current': docs._doc.items_current,
                                            'items_entries': docs._doc.items_entries,
                                            'items_outgoings': tmp_outgoings,
                                            'items_stock': tmp_items_stock
                                        }

                                         inventoryModel.asyncPatch(objectInventory).done(x=> {});

                                        resolve({
                                            statusItem: enums.STATUS_ITEM.SUCCESS,
                                            statusCode: enums.HTTP_STATUS_CODE.OK,
                                            result: JSON.stringify(objectEntity),
                                            message: `Se realizo la venta correctamente`,
                                            href: '',
                                            function: ''
                                        });

                                    });




                            }
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
    }


}