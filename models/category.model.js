const categorymodel = require('../entitys/catalogdetails.entity');
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util')
const Promise = require("promise");

module.exports = {
    asyncCreate: function (objCatalogDetails) {
        return new Promise(function (resolve, reject) {
            try {
                let category = new categorymodel({
                    id_item: enums.CATALOGS.CATEGORYS,
                    status_item: enums.STATUS_ITEM.ACTIVO,
                    maker: objCatalogDetails.maker,
                    create_date: new Date(),
                    modification_date: new Date(),
                    row: objCatalogDetails.row,
                    //  row: 0,
                    field0: objCatalogDetails.name,
                    field1: "",
                    field2: "",
                    field3: "",
                    field4: "",
                    field5: "",
                    field6: "",
                    field7: "",
                    field8: "",
                    field9: "",
                    field10: "",
                    field11: "",
                    field12: "",
                    field13: "",
                    field14: "",
                    field15: ""
                });

                category.save(function (err) {
                    if (err) reject(-100);
                    console.dir(category);
                    resolve(category);
                });
            } catch (error) {
                reject(error);
            }
        });

    },
    asyncCheckExist: function (objCatalogDetails) {
        return new Promise(function (resolve, reject) {
            try {
                let query = categorymodel.findOne({
                    'id_item': enums.CATALOGS.CATEGORYS,
                    'field0': objCatalogDetails.name
                }, 'field0 id', function (err, res) {
                    if (err) return err;

                    if (res == null) {
                        console.log('null = 0');
                        resolve(0);
                    } else {
                        console.log(' = 1');
                        let result = (res._doc) ? 1 : 0;
                        resolve(result);
                    }
                });
            } catch (ex) {
                reject(ex);
            }
        }
        );
    },
    asyncFindById: function (objCatalogDetails) {
        return new Promise(function (resolve, reject) {
            try {
                let query = categorymodel.findOne({
                    'id_item': enums.CATALOGS.CATEGORYS,
                    'row': objCatalogDetails.uid
                    // }, 'field0 id', function (err, res) {
                }, ' _id id_item status_item maker create_date modification_date row field0 field1 field2 field3 field4 field5 field6 field7 field8 field9 field10 field11 field12 field13 field14 field15', function (err, res) {
                    if (err) return err;
                    if (res == null) {
                        throw Error(res);
                        resolve(0);
                    } else {
                        resolve(res._doc);
                    }
                });
            } catch (ex) {
                reject(ex);
            }
        });
    },
    asyncDelete: function (objCatalogDetails) {
        return new Promise(function (resolve, reject) {
            try {
                let query = categorymodel.findOneAndUpdate({
                    'id_item': enums.CATALOGS.CATEGORYS,
                    '_id': objCatalogDetails._id
                }, {
                        'status_item': enums.STATUS_ITEM.DELETE,
                        'maker': objCatalogDetails.maker,
                        'modification_date': new Date()
                    }, function (err, res) {
                        if (err) return err;
                        if (res == null) {
                            throw Error(res);
                            resolve(0);
                        } else {
                            resolve(res._doc);
                        }
                    });
            } catch (ex) {
                reject(ex);
            }
        });
    },
    /*
        _id: req.body._id,
      maker: req.body.maker,
      field0: req.body.name,
      status_item: req.body.status_item
    */
    asyncUpdate: function (objCatalogDetails) {
        return new Promise(function (resolve, reject) {
            try {
                let query = categorymodel.findOneAndUpdate({
                  //  'id_item': enums.CATALOGS.CATEGORYS,
                    '_id': objCatalogDetails._id
                }, {
                        'field0': objCatalogDetails.name,
                        'status_item': objCatalogDetails.status_item,
                        'maker': objCatalogDetails.maker,
                        'modification_date': new Date()
                    }, function (err, res) {
                        if (err) return err;
                        if (res == null) {
                            throw Error(res);
                            resolve(0);
                        } else {
                            resolve(res._doc);
                        }
                    });
            } catch (ex) {
                reject(ex);
            }
        });
    },
    asyncNext: function () {
        return new Promise(function (resolve, reject) {
            try {
                // categorymodel.findOne({
                //     'id_item': enums.CATALOGS.CATEGORYS
                // }, 'row id',
                //     function (err, result) {
                //         if (err) return Error(err);
                //         if (result == null)
                //             resolve(0);
                //         else
                //             resolve(parseInt(result._doc.row) + 1);
                //     });
                let test = categorymodel.find({ 'id_item': enums.CATALOGS.CATEGORYS }).sort({ row: -1 }).limit(1);
                console.dir(test);


            } catch (error) {
                reject(error);
            }
        });
    }

};
