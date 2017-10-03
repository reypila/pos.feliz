/**
 * Created by Voltron on 12/05/2017.
 */
const validator = require('validator');
const usermodel = require('../models/users.model');
const crypto = require('../util/crypto.util');
const userEntity = require('../entitys/user.entity');
// const users_catalogdetails = require('../models/catalogdetails.model');
const enums = require('../util/enum.util');
const email = require('../util/email.util');
const responseutil = require('../util/response.util');

// => users
module.exports = {
    GetById: function (req, res, next) {
        const objUser = { "_id": req.params.id };
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
                "Content-Type": "text/html; charset=utf-8"
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
                            let promise = new Promise(function (resolve, reject) {
                                email.init(req.body.email);
                            }).then(x => {
                                // responseutil.Send(res, 400, '', false, 'Usuario ya existe', '', '');
                                // responseutil.Send(res, 200)
                                res.status(200).send(JSON.stringify(user));
                            });

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
        // let iduser = req.params.id;
        // if (iduser) {
        //     // start
        //     let objUser = {
        //         "ID": iduser,
        //         "NAME": req.body.name,
        //         "LASTNAME": req.body.lastname,
        //         "ALTERNATEMAIL": req.body.alternatemail,
        //         "BIRTHDAY": req.body.birthday,
        //         "RFC": req.body.rfc,
        //         "CURP": req.body.curp,
        //         "GENRE": req.body.genre,
        //         "ZIPCODE": req.body.zipcode,
        //         "HOME_REFERENCE": req.body.home_reference,
        //         "APARTMENT_NUMBER": req.body.apartment_number,
        //         "TELEPHONE_NUMBER": req.body.telephone_number,
        //         "TELEPHONE_NUMBER2": req.body.telephone_number2
        //     };
        //     // end
        //     usermodel.asyncSet(req, res, next, objUser);
        // } else {
        //     res.status(400).send('id user required');
        // }
    },
    UploadImg: function (req, res, next) {

        // usermodel.asyncUploadImgDropbox();
        //usermodel.asynUploadImg();
    }


}