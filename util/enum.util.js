/**
 * Created by developer on 6/28/2017.
 */
const STATUS_ITEM = {
    "recoveryPwd": 10,
    "OK": 1,
    "DELETE": -1,
    "ACTIVO": 100,
    "INACTIVO": -100,
    "INCIDENCIA": -1,
    "PENDIENTE":2,
}

const RESOURCES = {
    "uri": 'http://localhost:8084/',
}

const STATUS_ITEM2 = {
    "RecoveryPwd2": 10
}

const CATALOGS = {
    "ZIPCODESMX": 1,
    "CATEGORYS": 2,
}
const GENRE = {
    "NEUTRAL": 0,
    "MALE": 1,
    "FEMALE": 2
}

const DateTimeNowToMilliSeconds =  function(){
        var d = new Date();
        var n = d.getTime();
        return n;
}

module.exports = { DateTimeNowToMilliSeconds, STATUS_ITEM, STATUS_ITEM2, RESOURCES, CATALOGS, GENRE };
