const userModel = require('../entities/user.entity');
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util')
const Promise = require('promise');

module.exports = {

    asyncGet: function(objuser) {
        console.dir(objuser);
        let promesa = new Promise(function(resolve, reject) {
            try {

                console.dir(objuser);

                let query = userModel.find(objuser);

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

                    console.log('*********************************************************')
                    console.dir(docs);

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
    asyncGetAll: function() {
        let promesa = new Promise(function(resolve, reject) {
            try {
                const query = userModel.find({});
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
                        statusItem: enums.STATUS_ITEM.EXISTE,
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
    asyncCheckExist: function(objuser) {
        return new Promise(function(resolve, reject) {
            try {
                let query = userModel.findOne({
                    'email': objuser.email,
                    'password': objuser.password
                }, '_id id_item', function(err, res) {
                    if (err) return err;

                    if (res == null) {
                        console.log('null = 0');
                        resolve(0);
                    } else {
                        // console.log(' = 1');
                        const result = (res._doc) ? 1 : 0;
                        resolve(result);
                    }
                });

            } catch (error) {
                reject(error);
            }
        });
    },
    asyncSet: function(objuser) {
        return new Promise(function(resolve, reject) {
            try {
                let query = userModel.findOneAndUpdate({
                    '_id': objuser._id
                }, {
                    'status_item': objuser.status_item,
                    'maker': objuser.maker,
                    'modification_date': new Date(),
                    'password': objuser.password,
                    'name': objuser.name,
                    'lastname': objuser.lastname,
                    'lastname2': objuser.lastname,
                    'alternatemail': objuser.alternatemail,
                    'birthday': objuser.birthday,
                    'rfc': objuser.rfc,
                    'curp': objuser.curp,
                    'genre': objuser.genre,
                    'zipcode': objuser.zipcode,
                    'home_reference': objuser.home_reference,
                    'apartment_number': objuser.apartment_number,
                    'telephone_number': objuser.telephone_number,
                    'telephone_number2': objuser.telephone_number2
                }, function(err, res) {
                    if (err) return err;
                    if (res == null || typeof(res._doc) == 'undefined') {
                        resolve(enums.STATUS_ITEM.INCIDENCIA);
                    } else {
                        resolve(enums.STATUS_ITEM.OK);
                    }
                });
            } catch (ex) {
                reject(ex);
            }
        });
    }
}