const Promise = require('promise');
const inventoryEntity = require('../entities/inventory.entity');
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util')


module.exports = {
    asyncDelete: function (objectInventory) {
        const promesa = new Promise(function (resolve, reject) {
            try {

                let query = inventoryEntity.findOneAndUpdate({
                    '_id': objectInventory.id
                }, {
                        'status_item': objectInventory.status_item,
                        'modification_date': objectInventory.modification_date,
                        'maker': objectInventory.maker
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
                                result: ` No found item ${objectInventory.id}`,
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
    asyncPatch: function (objectInventory) {
        const promesa = new Promise(function (resolve, reject) {
            try {

                let query = inventoryEntity.findOneAndUpdate({
                    '_id': objectInventory.id
                }, {
                        'status_item': objectInventory.status_item,
                        'modification_date': objectInventory.modification_date,
                        'maker': objectInventory.maker,
                        'product_code': objectInventory.product_code,
                        'barcode': objectInventory.barcode,
                        'description': objectInventory.description,
                        'items_current': objectInventory.items_current,
                        'items_entries': objectInventory.items_entries,
                        'items_outgoings': objectInventory.items_outgoings,
                        'items_stock': objectInventory.items_stock
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
                                result: ` No found item ${objectInventory.id}`,
                                message: 'set',
                                href: '',
                                function: ''
                            });
                        } else {
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
    asyncGet: function (objectInventory) {
        let promesa = new Promise(function (resolve, reject) {
            try {

                const query = inventoryEntity.find({
                    '_id': objectInventory.id
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
                const query = inventoryEntity.find({});
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
    asyncCreate: function (objectInventory) {
        let promesa = new Promise(function (resolve, reject) {

            try {
                const query = inventoryEntity.find({
                    'product_code': objectInventory.product_code,
                    'barcode': objectInventory.barcode
                });

                query.exec(function (error, docs) {
                    let tmprow = 0;
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

                    if (docs.length >= 1) {
                        resolve({
                            statusItem: enums.STATUS_ITEM.EXISTE,
                            statusCode: enums.HTTP_STATUS_CODE.CONFLICT,
                            result: JSON.stringify(docs),
                            message: `* Item  ${objectInventory.table_name} exist`,
                            href: '',
                            function: ''
                        });
                    } else {
                        // get max value id_table
                        const selectItemMAX = inventoryEntity.findOne({
                        // status_item: true
                        }).sort('-id_table');

                        selectItemMAX.exec(function (error, itemMAX) {
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

                            if (enums.CheckExist(itemMAX)) {
                                tmprow = parseInt(itemMAX.id_table) + 1;
                            }

                            let objectEntity = inventoryEntity({
                                status_item: objectInventory.status_item,
                                create_date: objectInventory.create_date,
                                modification_date: objectInventory.modification_date,
                                maker: objectInventory.maker,
                                product_code: objectInventory.product_code,
                                barcode: objectInventory.barcode,
                                description: objectInventory.description,
                                imgurl: objectInventory.imgurl,
                                items_current: objectInventory.items_current,
                                items_entries: objectInventory.items_entries,
                                items_outgoings: objectInventory.items_outgoings,
                                items_stock: objectInventory.items_stock
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
                        })
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