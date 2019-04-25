/**
 * Created by Voltron on 12/05/2017.
 */
const validator = require('validator');
const userModel = require('../models/users.model');
const crypto = require('../util/crypto.util');
const userEntity = require('../entities/user.entity');
const enums = require('../util/enum.util');
const email = require('../util/email.util');
const responseutil = require('../util/response.util');
const jwt = require('jsonwebtoken');
const SuperSecret = require('../config/SuperSecret');
const jwtutil = require('../util/jwt.util');
module.exports = {
    Upload: function (req, res, next) {

    },
    LoginDecode: function (req, res, next) {

        let tmpdecode = jwtutil.verify(req.headers.authorization);
        // JSON.stringify()
        responseutil.Send(res, enums.HTTP_STATUS_CODE.OK, JSON.stringify(tmpdecode), '', '', '');
    },
    Login: function (req, res, next) {

        if (!enums.CheckExist(req.body.email) && !enums.CheckExist(req.body.pwd)) {
            responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required  parameters not set id', '', '', '');
            next();
        }

        let objUser = {
            email: req.body.email,
            password: req.body.password,
            _id: "",
            item_order: "",
            status_item_id: "",
            maker: "",
            create_date: "",
            modification_date: "",
            name: "",
            lastname: "",
            lastname2: "",
            alternatemail: "",
            birthday: "",
            rfc: "",
            curp: "",
            zipcode: "",
            home_reference: "",
            address: "",
            apartment_number_int: "",
            apartment_number_ext: "",
            telephone_number: "",
            telephone_number2: "",
            rol_id: "",
        };

        userModel.asyncLogin(objUser).then(resolve => {

            let sOptions = {
                issuer: "Resource",
                subject: "iam@user.me",
                audience: "Client_Identity" // this should be provided by client
            }

            if (resolve.statusItem == enums.STATUS_ITEM.SUCCESS) {
                let tmpobjUser = JSON.parse(resolve.result);

                objUser._id = tmpobjUser._id;
                objUser.item_order = tmpobjUser.item_order;
                objUser.status_item_id = tmpobjUser.status_item_id;
                objUser.maker = tmpobjUser.maker;
                objUser.create_date = tmpobjUser.create_date;
                objUser.modification_date = tmpobjUser.modification_date;
                objUser.name = tmpobjUser.name;
                objUser.lastname = tmpobjUser.lastname;
                objUser.lastname2 = tmpobjUser.lastname2;
                objUser.alternatemail = tmpobjUser.alternatemail;
                objUser.birthday = tmpobjUser.birthday;
                objUser.rfc = tmpobjUser.rfc;
                objUser.curp = tmpobjUser.curp;
                objUser.zipcode = tmpobjUser.zipcode;
                objUser.home_reference = tmpobjUser.home_reference;
                objUser.address = tmpobjUser.address;
                objUser.apartment_number_int = tmpobjUser.apartment_number_int;
                objUser.apartment_number_ext = tmpobjUser.apartment_number_ext;
                objUser.telephone_number = tmpobjUser.telephone_number;
                objUser.telephone_number2 = tmpobjUser.telephone_number2;
                objUser.rol_id = tmpobjUser.rol_id;

                let sign = jwtutil.sign(objUser, sOptions);
                responseutil.Send(res, resolve.statusCode, sign, resolve.message, resolve.href, resolve.function);
            } else {
                responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
            }
            next();
        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });

    },
    Delete: function (req, res, next) {
        if (!enums.CheckExist(req.params.id)) {
            responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required  parameters not set id', '', '', '');
            next();
        }

        let datetmp = enums.DateTimeNowToMilliSeconds();

        const objUser = {
            _id: req.params.id,
            modification_date: datetmp,
            status_item_id: enums.STATUS_ITEM.DELETE
        }

        userModel.asyncDelete(objUser).then(resolve => {
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
            next();
        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });


    },
    Patch: function (req, res, next) {

        if (!enums.CheckExist(req.params.id)) {
            responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required  parameters not set id', '', '', '');
            next();
        }

        // start
        let datetmp = enums.DateTimeNowToMilliSeconds();

        const objUser = {
            _id: req.params.id,
            item_order: req.body.item_order,
            status_item_id: req.body.status_item_id,
            modification_date: datetmp,
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            lastname: req.body.lastname,
            lastname2: req.body.lastname2,
            alternatemail: req.body.alternatemail,
            birthday: req.body.birthday,
            rfc: req.body.rfc,
            curp: req.body.curp,
            genre: req.body.genre,
            zipcode: req.body.zipcode,
            home_reference: req.body.home_reference,
            address: req.body.address,
            apartment_number_int: req.body.apartment_number_int,
            apartment_number_ext: req.body.apartment_number_ext,
            telephone_number: req.body.telephone_number,
            telephone_number2: req.body.telephone_number2,
            rol_id: req.body.rol_id
        };
        // end
        userModel.asyncPatch(objUser).then(resolve => {
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
            next();
        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });

    },
    Get: function (req, res, next) {

        let objUser = {};

        if (enums.CheckExist(req.params.id)) {
            objUser = {
                '_id': req.params.id
            };
        }
        if (enums.CheckExist(req.body.email) && enums.CheckExist(req.body.password)) {

            objUser = {
                'email': req.body.email,
                'password': req.body.password
            };
        }

        userModel.asyncGet(objUser).then(resolve => {
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
            next();
        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });
    },
    Create: function (req, res, next) {

        if (!enums.CheckExist(req.body.email) ||
            !enums.CheckExist(req.body.password) ||
            !validator.isEmail(req.body.email)) {
            responseutil.Send(res, enums.STATUS_ITEM.BADREQUEST, '', 'Required body parameters not set email or password', '', '', '');
            next();
        } else {
            // let tmppwd = crypto.encrypt(req.body.password);
            let tmppwd = req.body.password;
            let query = userEntity.find({
                email: req.body.email
            });


            query.exec(function (error, docs) {
                if (error) {
                    responseutil.Send(res, enums.HTTP_STATUS_CODE.BAD_REQUEST, '', error.message, '', '');
                }

                if (docs.length >= 1) {
                    responseutil.Send(res, enums.HTTP_STATUS_CODE.CONFLICT, '', 'Usuario ya existe', '', '');
                } else {


                    const querygetmax = userEntity.findOne().sort('-item_order');

                    querygetmax.exec(function (err, docgetmax) {
                        if (error) {
                            responseutil.Send(res, enums.HTTP_STATUS_CODE.BAD_REQUEST, '', error.message, '', '');
                        }

                        let tmprow = 0;

                        if (enums.CheckExist(docgetmax)) {
                            tmprow = parseInt(docgetmax.item_order) + 1;
                        }
                        // start
                        let datetmp = enums.DateTimeNowToMilliSeconds();

                        let user = userEntity({
                            item_order: tmprow,
                            status_item_id: enums.STATUS_ITEM.PENDIENTE,
                            maker: req.body.email,
                            create_date: datetmp,
                            modification_date: 0,
                            email: req.body.email,
                            password: tmppwd,
                            name: '',
                            lastname: '',
                            lastname2: '',
                            alternatemail: '',
                            birthday: 0,
                            rfc: '',
                            curp: '',
                            genre: 0,
                            zipcode: '',
                            home_reference: '',
                            address: '',
                            apartment_number_int: '',
                            apartment_number_ext: '',
                            telephone_number: '',
                            telephone_number2: '',
                            rol_id: enums.ROLES.DEMO
                        });

                        user.save(function (error) {
                            if (error) {
                                responseutil.Send(res, enums.HTTP_STATUS_CODE.BAD_REQUEST, '', error.message, '', '');

                            } else {
                                email.init(req.body.email);
                                responseutil.Send(res, enums.HTTP_STATUS_CODE.OK, JSON.stringify(user), 'Item creado con exito', '', '');
                            }
                        });
                        // end
                    });
                }
            });
        }
    },
    GetAll: function (req, res, next) {

        userModel.asyncGetAll().then(resolve => {
            responseutil.Send(res, resolve.statusCode, resolve.result, resolve.message, resolve.href, resolve.function);
            next();
        }, reject => {
            responseutil.Send(res, reject.statusCode, reject.result, reject.message, reject.href, reject.function);
            next();
        });
    },
    CheckExist: function (req, res, next) {
        let pwd = req.body.password;
        pwd = crypto.encrypt(pwd);

        const objuser = {
            'email': req.body.email,
            'password': pwd
        };

        userModel.asyncCheckExist(objuser).then(x => {
            if (x == enums.STATUS_ITEM.OK) {
                let token = jwt.sign(objuser, SuperSecret.NIP, {
                    expiresIn: '360h'
                });
                res.json({
                    sucess: true,
                    message: 'Enjoy your token',
                    token: token
                });
                next(res);
            } else {
                res.writeHead(400, {
                    'Content-Type': 'text/html'
                });
                res.write('Verificar usuario y contrasena');
                res.end();
                next(res);
            }
        })
    }
}