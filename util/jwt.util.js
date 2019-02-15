const fs = require('fs');
const jwt = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY = fs.readFileSync('./private.key', 'utf8');
var publicKEY = fs.readFileSync('./public.key', 'utf8');

module.exports = {
    sign: (payload, $Options) => {
        /*
         sOptions = {
          issuer: "Authorizaxtion/Resource/This server",
          subject: "iam@user.me", 
          audience: "Client_Identity" // this should be provided by client
         }
        */
        // Token signing options
        var signOptions = {
            issuer: $Options.issuer,
            subject: $Options.subject,
            audience: $Options.audience,
            //expiresIn: "30d", // 30 days validity
            expiresIn: "10d",
            algorithm: "RS256"
        };
        let tmp = jwt.sign(payload, privateKEY, signOptions);
        return tmp;
    },
    verify: (token) => {
   // verify: (req, token, $Option) => {

        const header = token;
        let tokentrue = '';
        if(typeof header !== 'undefined'){
            const bearer = header.split(' ');
            tokentrue  = bearer[1];
          //  req.token = token
        }
        /*
         vOption = {
              let sOptions = {
                issuer: "Resource",
                subject: "iam@user.me",
                audience: "Client_Identity" // this should be provided by client
            }
        */

        var verifyOptions = {
            issuer: "Resource",
            subject: "iam@user.me",
            audience: "Client_Identity",
            expiresIn: "10d",
            //expiresIn: 100,
            algorithm: ["RS256"]
        };

        try {
            return jwt.verify(tokentrue, publicKEY, verifyOptions);
        } catch (err) {
            return false;
        }
    },
    decode: (token) => {
        return jwt.decode(token, {
            complete: true
        });
        //returns null if token is invalid
    }
}