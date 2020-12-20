
// var nodemailer = require('../../node_modules/nodemailer');

import { nodemailer } from '../../node_modules/nodemailer';



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
    }
});
export const sentMail = (test, test2) => {
    // console.log("sentMail inside func ", test);

    var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'shkliarskiyigor@gmail.com',
        subject: 'Sending Email using Node.js',
        text: `${test}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(info.response);
        }
    });
}
