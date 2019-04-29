const catalogEntity = require('../entities/catalogs.entity');
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

                }, {
                    new: true
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
                }, {
                    new: true
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
                }).populate('catalogsid');

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
            try {
             
                const datetmp = enums.DateTimeNowToMilliSeconds();

                let rowitem = rowsEntity({
                    status_item: true,
                    create_date: datetmp,
                    modification_date: 0,
                    catalogsid: requestObject.catalogsid, // buscar como obtener maximo
                    //table_name: catalogObj.table_name,
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

                rowitem.save(function(error) {
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
                            result: JSON.stringify(rowitem),
                            message: '',
                            href: '',
                            function: ''
                        });

                        // // Queda pendiente como lograr agregar el child al padre
                        // let query = catalogEntity.findOneAndUpdate({
                        //     '_id': requestObject.catalogsid
                        // }, {
                        //     $push: {
                        //         rows: rowitem
                        //     }
                        // }, {
                        //     new: true
                        // }, function(error, res) {
                        //     if (error) {
                        //         reject({
                        //             statusCode: enums.STATUS_ITEM.ERROR,
                        //             message: error.message
                        //         });
                        //     } else {
                        //         resolve(JSON.stringify(res, null));
                        //     }
                        // });

                    }
                });
                // set collection

                // end collection

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
                let query = catalogEntity.findOneAndUpdate({
                    '_id': requestObject.id
                }, {
                    status_item: false,
                    modification_date: datetmp,

                }, {
                    new: true
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
                }, {
                    new: true
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
    asynGet: function(catalogObj) {
        let promesa = new Promise(function(resolve, reject) {
            try {

                const query = catalogEntity.find({
                    '_id': catalogObj.id
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
    asyncGetAll: function() {
        let promesa = new Promise(function(resolve, reject) {
            try {
                const query = catalogEntity.find({});
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
    asyncCreate: function(catalogObj) {
        let promesa = new Promise(function(resolve, reject) {
            try {

                const query = catalogEntity.find({
                    'table_name': catalogObj.table_name
                });

                query.exec(function(error, docs) {
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
                            message: `El item ${catalogObj.table_name} ya existe`,
                            href: '',
                            function: ''
                        });
                    } else {

                        // get max value id_table
                        const querygetmax = catalogEntity.findOne({
                            // status_item: true
                        }).sort('-id_table');

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

                            let datetmp = 0;

                            if (enums.CheckExist(docgetmax)) {
                                tmprow = parseInt(docgetmax.id_table) + 1;
                                datetmp = enums.DateTimeNowToMilliSeconds();
                            }

                            let catalog = catalogEntity({
                                status_item: true,
                                create_date: datetmp,
                                modification_date: 0,
                                id_table: tmprow,
                                table_name: catalogObj.table_name,
                                row_order: tmprow
                            });

                            catalog.save(function(error) {

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
                                        result: JSON.stringify(catalog),
                                        message: '',
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