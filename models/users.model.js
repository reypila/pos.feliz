const usermodel = require('../entitys/user.entity');
const enums = require('../util/enum.util');
const responseutil = require('../util/response.util')
const Promise = require('promise');

module.exports = {
    asyncCheckExist: function (objuser) {
        return new Promise(function (resolve, reject) {
            try {
                let query = usermodel.findOne({
                    'email': objuser.email,
                    'password': objuser.password
                }, '_id id_item', function (err, res) {
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
    asynGetByID: function (objuser) {
        // console.dir(objuser);
        return new Promise(function (resolve, reject) {
            try {
                const query = usermodel.find({ '_id': objuser._id });
                query.exec(function (err, docs) {
                    if (err) {
                        resolve(-1);
                    }
                    docs.length >= 1 ? resolve(docs[0]._doc) : resolve(0);
                });
            } catch (error) {
                console.log('AQUI HAY UN ERROR' + error);
                reject(error);
            }
        });
    },
    asyncSet: function (objuser) {
        return new Promise(function (resolve, reject) {
            try {
                let query = usermodel.findOneAndUpdate(
                    {
                        '_id': objuser.id
                    }, {
                        'status_item': req.body.status_item,
                        'maker': req.body.maker,
                        'modification_date': new Date(),
                        'password': req.body.password,
                        'name': req.body.name,
                        'lastname': req.body.lastname,
                        'lastname2': req.body.lastname,
                        'alternatemail': req.body.alternatemail,
                        'birthday': req.body.birthday,
                        'rfc': req.body.rfc,
                        'curp': req.body.curp,
                        'genre': req.body.genre,
                        'zipcode': req.body.zipcode,
                        'home_reference': req.body.home_reference,
                        'apartment_number': req.body.apartment_number,
                        'telephone_number': req.body.telephone_number,
                        'telephone_number2': req.body.telephone_number2
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
    }
}