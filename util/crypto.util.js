/**
 * Created by Voltron on 14/05/2017.
 */

const Promise = require("promise");
let crypto = require('crypto');
let password = '35ddb03f521e';

module.exports = {
    encrypt:function (txt) {
        let cipher = crypto.createCipher('aes-256-cbc', password )
        let crypted = cipher.update(txt, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    },
    descrypt: function (txt) {
        let decipher = crypto.createDecipher('aes-256-cbc', password )
        let dec = decipher.update(txt, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }
}