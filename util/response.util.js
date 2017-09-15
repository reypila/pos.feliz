/**
 * Created by Voltron on 18/06/2017.
 */
module.exports = {

    // Type: function (res, option, msg, next) {
    //     switch (option) {
    //         // OK
    //         case 0:
    //             res.writeHead(200, { "Content-Type": "application/json" });
    //             res.write(JSON.stringify(msg));
    //             res.end();
    //             next();
    //             break;
    //         // Bad Request
    //         case 1:
    //             res.writeHead(400, { "Content-Type": "text/plain" });
    //             res.write(msg);
    //             res.end();
    //             next();
    //             break;
    //         default:
    //             break;
    //     }
    // },
    Send: function (res, numberResponse, result, message, href, functionName) {
        if (numberResponse == null && (numberResponse != 200 && numberResponse != 400)) {
            throw Error("numberResponse is required");
        }
        
        const buildResponse = { "result": result, "message": message, "href": href, "function": functionName };
        res.status(numberResponse).send(JSON.stringify(buildResponse));
    }
};