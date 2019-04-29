/**
 * Created by Voltron on 12/06/2017.
 */
// const _dataraw = require(' ../Config/DataRAW');
const _dataraw = require('./../config/DataRAW');
const nodemailer = require('nodemailer');
// const smtpTransport = require('');

module.exports = {
    init: function (objReceiver) {
        // subject
        var vsubject = _dataraw.subject();
        vsubject = vsubject[Math.floor(Math.random() * vsubject.length)];

        // body
        //var vbody = _dataraw.body();
        var vbody = _dataraw.body2(objReceiver);
        vbody = vbody[Math.floor(Math.random() * vbody.length)];
        // Email sender
        var vsender = _dataraw.senderconfig();
        vsender = vsender[Math.floor(Math.random() * vsender.length)];

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                  user: 'eblaher@gmail.com',
                  pass: 'JQuery0170'
                }
        });

        let mailOptions = {
            to: 'iblanquel@gmail.com',
            from: vsender.auth.user,
            subject: vsubject,
            html: vbody
        };

        transporter.sendMail(mailOptions,(error,info) => {
            if (error) {
            return (error);
        }
        // Preview only available when sending through an Ethereal account
        });

        // transporter.sendMail({
        //     to: objReceiver,
        //     from: vsender.auth.user,
        //     subject: vsubject,
        //     html: vbody


        // }, function (error) {
        //     if (error) {
        //         //callback(error);
        //     } else {
        //     }
        // });

        return objReceiver.EmailOrigin;
    }
}