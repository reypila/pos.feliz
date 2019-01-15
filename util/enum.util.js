/**
 * Created by developer on 6/28/2017.
 */
var fetch = require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
const DropboxConfig = require('../config/DropboxConfig');

const dbxTest = function() {
    console.log('start');

    var dbx = new Dropbox({
        accessToken: DropboxConfig.accessToken,
        fetch: fetch
    });

    dbx.filesListFolder({
            path: '/assets'
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });

}

const MEASUREMENT_UNIT = {
    "H87": "Pieza (Múltiplos / Fracciones / Decimales)",
    "xun": "Unidad (Unidades de empaque)",
    "KGM": "Kilogramo (Mecánica)",
    "MTR": "Metro (Tiempo y Espacio)",
    "LTR": "Litro (Tiempo y Espacio)",
    "XBX": "Caja (Unidades de empaque)",
    "XPK": "Paquete (Unidades de empaque)",
    "XKI": "Kit (Conjunto de piezas)",
    "GRM": "Gramos (Mecánica)"
}

const CATALOGS = {
    "TABLA_OPTION": 0,
    "ROW_OPTION": 1,
    "ZIPCODESMX": 3,
    "CATEGORYS": 4,
    "ROLES": 5
}

const ROLES = {
    "ADMIN": "1",
    "VENDEDOR": "2",
    "AUDITORIA": "3",
    "DEMO": "4"
}
const STATUS_ITEM = {
    "SIN_STOCK": -5,
    "INEXISTENTE": -4,
    "INCIDENCIA": -3,
    "INACTIVO": -2,
    "DELETE": -1,
    "EXISTE": 1,
    "PENDIENTE": 2,
    "RECOVERYPASSWORD": 3,
    "ACTIVO": 4,
    "SUCCESS": 5
}

const HTTP_STATUS_CODE = {
    "OK": 200,
    "CREATED": 201,
    "ACCEPTED": 202,
    "NO_CONTENT": 204,
    "BAD_REQUEST": 400,
    "UNAUTHORIZED": 401,
    "FORBIDDEN": 403,
    "NOT_FOUND": 404,
    "CONFLICT": 409,
    "INTERNAL_SERVER_ERROR": 500,
    "NOT_IMPLEMENTED": 501,
    "BAD_GATEWAY": 502
}

const RESOURCES = {
    "uri": 'http://localhost:8084/',
}


const GENRE = {
    "NEUTRAL": 0,
    "MALE": 1,
    "FEMALE": 2
}

const DateTimeNowToMilliSeconds = function() {
    var d = new Date();
    var n = d.getTime();
    return n;
}

//const CheckExist = function function_name(argument) {
const CheckExist = function(argument) {
    if (typeof argument === 'undefined' || argument == null || argument == 'undefined') {
        return false;
    } else {
        return true;
    }
}

const IsNumeric = function(argument) {
    if (typeof argument === 'undefined' || argument == null || argument == 'undefined') {
        return false;
    } else {
        if (Number.isInteger(argument)) {
            return true;
        } else {
            return false;
        }

    }
}



module.exports = {
    IsNumeric,
    dbxTest,
    ROLES,
    MEASUREMENT_UNIT,
    HTTP_STATUS_CODE,
    CheckExist,
    DateTimeNowToMilliSeconds,
    STATUS_ITEM,
    RESOURCES,
    CATALOGS,
    GENRE
};