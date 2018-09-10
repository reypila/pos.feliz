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

const STATUS_ITEM = {
    "recoveryPwd": 10,
    "OK": 200,
    "OKNOCONTENT": 204,
    "DELETE": -1,
    "ACTIVO": 100,
    "INACTIVO": -100,
    "INCIDENCIA": -1,
    "PENDIENTE": 2,
    "EXISTE": 1,
    "ERROR": 500, // Internal Server Error
    "NOTFOUND": 404 ,
    "BADREQUEST": 404 
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
    if (typeof argument === 'undefined' || argument == null )  {
        return false;
    }else{
        return true;
    }
}

module.exports = {
    CheckExist,
    DateTimeNowToMilliSeconds,
    STATUS_ITEM,
    STATUS_ITEM2,
    RESOURCES,
    CATALOGS,
    GENRE
};