const Promise = require('promise');
const entryEntity = require('../entities/entry.entity');
const inventoryEntity = require('../entities/inventory.entity');
const inventoryModel = require('../models/inventory.model');
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util')


module.exports = {
    asyncDelete: function (objectEntry) {
        const promesa = new Promise(function (resolve, reject) {
            try {

                let query = entryEntity.findOneAndUpdate({
                    '_id': objectEntry.id
                }, {
                        'status_item': objectEntry.status_item,
                        'modification_date': objectEntry.modification_date,
                        'maker': objectEntry.maker
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
                                result: ` No found item ${objectEntry.id}`,
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
    asyncPatch: function (objectEntry) {
        const promesa = new Promise(function (resolve, reject) {
            try {

                let query = entryEntity.findOneAndUpdate({
                    '_id': objectEntry.id
                }, {
                        'status_item': objectEntry.status_item,
                        'modification_date': objectEntry.modification_date,
                        'maker': objectEntry.maker,
                        'product_code': objectEntry.product_code,
                        'barcode': objectEntry.barcode,
                        'description': objectEntry.description,
                        'items_current': objectEntry.items_current,
                        'items_entries': objectEntry.items_entries,
                        'items_outgoings': objectEntry.items_outgoings,
                        'items_stock': objectEntry.items_stock
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
                                result: ` No found item ${objectEntry.id}`,
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
    asyncGet: function (objectEntry) {
        let promesa = new Promise(function (resolve, reject) {
            try {

                const query = entryEntity.find({
                    '_id': objectEntry.id
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
                const query = entryEntity.find({});
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
    asyncCreate: function (objectEntry) {
        let promesa = new Promise(function (resolve, reject) {

            try {

                // check if exist in Inventary
                const queryInventoryEntity = inventoryEntity.find({
                    'product_code': objectEntry.product_code,
                    'barcode': objectEntry.barcode
                });

                queryInventoryEntity.exec(function (error, docsInventory) {

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

                    // EXIST INVENTORY 
                    if (docsInventory.length >= 1) {


                        const queryEntryEntity = entryEntity.find({
                            'product_code': objectEntry.product_code,
                            'barcode': objectEntry.barcode
                        });

                        queryEntryEntity.exec(function (error, docsEntryEntity) {
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

                            // Save Entry Info

                            let tmp_items_entries = docsEntryEntity._doc;

                            if (!enums.CheckExist(tmp_items_entries)) {
                                tmp_items_entries = 0;
                            }

                            //tmp_items_entries =  parseFloat(docsEntryEntity._doc.items_entries);
                            tmp_items_entries = tmp_items_entries + parseFloat(objectEntry.items_entries);


                            // create object for new entry 
                            let objectEntrytEntity = entryEntity({
                                status_item: objectEntry.status_item,
                                create_date: objectEntry.create_date,
                                modification_date: objectEntry.modification_date,
                                maker: objectEntry.maker,
                                product_code: objectEntry.product_code,
                                barcode: objectEntry.barcode,
                                description: objectEntry.description,
                                items_entries: tmp_items_entries,
                            });

                            // save entry in mongodb
                            objectEntrytEntity.save(function (error) {
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

                                    let tmp_items_stock = docsInventory[0]._doc.items_current + tmp_items_entries - docsInventory[0]._doc.items_outgoings;
                                    // #TODO
                                    // resarcir error 2019.01.11.08.07
                                    let objectInventoryEntity = {
                                        'id': docsInventory[0]._doc._id,
                                        'status_item': docsInventory[0]._doc.status_item,
                                        'modification_date': objectEntry.create_date,
                                        'maker': objectEntry.maker,
                                        'product_code': docsInventory[0]._doc.product_code,
                                        'barcode': docsInventory[0]._doc.barcode,
                                        'description': docsInventory[0]._doc.description,
                                        'items_current': docsInventory[0]._doc.items_current,
                                        'items_entries': tmp_items_entries,
                                        'items_outgoings': docsInventory[0]._doc.items_outgoings,
                                        'items_stock': tmp_items_stock
                                    }

                                    inventoryModel.asyncPatch(objectInventoryEntity).then(function (response) {
                                        resolve({
                                            statusItem: enums.STATUS_ITEM.SUCCESS,
                                            statusCode: enums.HTTP_STATUS_CODE.OK,
                                            result: JSON.stringify(objectEntrytEntity),
                                            message: 'create ',
                                            href: '',
                                            function: ''
                                        });
                                    },
                                        function (errordata) {
                                            // start
                                            reject({
                                                statusItem: enums.STATUS_ITEM.INCIDENCIA,
                                                statusCode: enums.HTTP_STATUS_CODE.BAD_REQUEST,
                                                result: '',
                                                message: error.message,
                                                href: '',
                                                function: ''
                                            });
                                            // end
                                        });


                                }
                            })

                        });

                    }
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