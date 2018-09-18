/**
 * Created by developer on 6/28/2017.
 */

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
    "AUDITORIA": "3"
}
const STATUS_ITEM = {
    "INEXISTENTE": -4,
    "INCIDENCIA": -3,
    "INACTIVO": -2,
    "DELETE": -1,
    "EXISTE": 1,
    "PENDIENTE": 2,
    "RECOVERYPASSWORD": 3,
    "ACTIVO": 4
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

const STATUS_ITEM2 = {
    "RecoveryPwd2": 10
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

const CheckExist = function function_name(argument) {
    if (typeof argument === 'undefined' || argument == null) {
        return false;
    } else {
        return true;
    }
}

module.exports = {
    HTTP_STATUS_CODE,
    CheckExist,
    DateTimeNowToMilliSeconds,
    STATUS_ITEM,
    RESOURCES,
    CATALOGS,
    GENRE
};