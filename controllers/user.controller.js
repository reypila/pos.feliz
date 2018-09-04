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
        // console.dir(req.body);

        if (!req.body.email || !req.body.password || !validator.isEmail(req.body.email)) {
            let tmp = '* Email y Contraseña es requerido ';
            res.writeHead(400, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.write('<html><head><title>400</title><body>400: Bad Request</body> <br/> ' + tmp + '</head>');
            res.end();
        } else {
            // let tmppwd = crypto.encrypt(req.body.password);
            let tmppwd = req.body.password;
            let query = userEntity.find({ email: req.body.email });
           
            query.exec(function (err, docs) {
                if (err) {
                    console.log('error' + err);
                    responseutil.Send(res, 400, '', false, ('error' + err), '', '');
                }

                if (docs.length >= 1) {
                   // console.dir(query );
                    responseutil.Send(res, 400, '', false, 'Usuario ya existe', '', '');
                } else {
                    console.dir('hello');
                    let datetmp = enums.DateTimeNowToMilliSeconds();

                    let user = userEntity({
                        item_order: 0,
                        status_item_id: enums.STATUS_ITEM.PENDIENTE,
                        maker: req.body.email,
                        create_date: datetmp,
                        modification_date: datetmp,
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
                        rol_id: 'NA',
                    });

                    user.save(function (err) {
                        if (err) {
                            // responseutil.Send(res,400,'',false,'Usuario ya existe','','');
                            responseutil.Send(res, 400, '', err.message, '', '', '');
                            // return err;
                        } else {
                            // email.init(req.body.email);
                            console.log('end email process');
                            responseutil.Send(res, 200, JSON.stringify(user), 'OK', '', '');
                        }
                    });
                }

            });
        }
    },
    GetAll: function (req, res, next) {
       var t =  usermodel.asyncGetAll(req, res, next).then(x => {
            responseutil.Send(res, 200, JSON.stringify(x), '', '', '');
        });
    },
    Update: function (req, res, next) {
        const id = req.params.id;
        if (id) {
            // start
            const objUser = {
                '_id': id,
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
                'genre': req.body.genre == enums.GENRE.FEMALE || req.body.genre == enums.GENRE.MALE ? req.body.genre : enums.GENRE.NEUTRAL,
                'zipcode': req.body.zipcode,
                'home_reference': req.body.home_reference,
                'apartment_number': req.body.apartment_number,
                'telephone_number': req.body.telephone_number,
                'telephone_number2': req.body.telephone_number2
            };
            // end
            usermodel.asyncSet(objUser).then(x => {
                if(x == enums.STATUS_ITEM.OK){
                    responseutil.Send(res, 200, JSON.stringify(objUser), 'OK', '', '');
                }else{
                    responseutil.Send(res, 400, '', 'Error', '', '');
                }
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