/**
 * Created by Voltron on 12/05/2017.
 */
const validator = require('validator');
const usermodel = require('../models/users.model');
const crypto = require('../util/crypto.util');
const userEntity = require('../entitys/user.entity');
const enums = require('../util/enum.util');
const email = require('../util/email.util');
const responseutil = require('../util/response.util');
const jwt = require('jsonwebtoken');
const SuperSecret = require('../config/SuperSecret');

// => users
module.exports = {
    GetById: function (req, res, next) {
        const objUser = { '_id': req.params.id };
        usermodel.asynGetByID(objUser).then(x => {
            console.dir(x);
            if (x <= 1) {
                responseutil.Send(res, 400, 'No existe usuario', '', '', '');
            } else {
                responseutil.Send(res, 200, x, '', '', '');
            }
            next();
        });
    },
    Create: function (req, res) {
        if (!req.body.email || !req.body.password || !validator.isEmail(req.body.email)) {
            let tmp = '* Email y Contraseña es requerido ';
            res.writeHead(400, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.write('<html><head><title>400</title><body>400: Bad Request</body> <br/> ' + tmp + '</head>');
            res.end();
        } else {
            let tmppwd = crypto.encrypt(req.body.password);
            let query = userEntity.find({ email: req.body.email });

            query.exec(function (err, docs) {
                if (err) {
                    console.log('error' + err);
                    responseutil.Send(res, 400, '', false, ('error' + err), '', '');
                }

                if (docs.length >= 1) {
                    responseutil.Send(res, 400, '', false, 'Usuario ya existe', '', '');
                } else {
                    let user = userEntity({
                        id_item: 0,
                        status_item: enums.STATUS_ITEM.ACTIVO,
                        maker: req.body.email,
                        create_date: new Date(),
                        modification_date: new Date(),
                        email: req.body.email,
                        password: tmppwd,
                        name: '',
                        lastname: '',
                        lastname2: '',
                        alternatemail: '',
                        birthday: new Date(),
                        rfc: '',
                        curp: '',
                        genre: 0,
                        zipcode: '',
                        home_reference: '',
                        apartment_number: '',
                        telephone_number: '',
                        telephone_number2: ''
                    });

                    user.save(function (err) {
                        if (err) {
                            // responseutil.Send(res,400,'',false,'Usuario ya existe','','');
                            return err;
                        } else {
                            email.init(req.body.email);
                            console.log('end email process');
                            responseutil.Send(res, 200, JSON.stringify(user), 'OK', '', '');
                        }
                    });
                }

            });
        }
    },
    GetAll: function (req, res, next) {
        //usermodel.asyncGetAll(req, res, next);
    },
    Update: function (req, res, next) {
        let id = req.params.id;
        if (id) {
            // start
            let objUser = {
                '_id': id,
                'status_item': req.body.status_item,
                'maker': req.body.maker,
                'modification_date': new Date(),
                'password': req.body.password,
                'name': req.body.name,
                'lastname': req.body.lastname,
                'lastname2': req.body.lastname,
                'alternatemail': req.body.alternatemail,
                'birthday': new Date(),
                'rfc': req.body.rfc,
                'curp': req.body.curp,
                'genre': req.body.genre,
                'zipcode': req.body.zipcode,
                'home_reference': req.body.home_reference,
                'apartment_number': req.body.apartment_number,
                'telephone_number': req.body.telephone_number,
                'telephone_number2': req.body.telephone_number2
            };
            // end
            usermodel.asyncSet(objUser).then(x => {
                console.dir(x);
            });
        } else {
            res.status(400).send('id user required');
        }
    },
    UploadImg: function (req, res, next) {

        // usermodel.asyncUploadImgDropbox();
        //usermodel.asynUploadImg();
    },
    CheckExist: function (req, res, next) {
        let pwd = req.body.password;
        pwd = crypto.encrypt(pwd);

        const objuser = { 'email': req.body.email, 'password': pwd };

        usermodel.asyncCheckExist(objuser).then(x => {
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