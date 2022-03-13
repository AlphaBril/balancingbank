"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.CHANGE_PASSWORD_EMAIL = exports.ACTIVATION_EMAIL = exports.SMTP_SECRET = exports.SMTP_USERNAME = void 0;
const nodemailer = require("nodemailer");
exports.SMTP_USERNAME = process.env.SMTP_USERNAME || "";
exports.SMTP_SECRET = process.env.SMTP_SECRET || "";
exports.ACTIVATION_EMAIL = "ACTIVATION_EMAIL";
exports.CHANGE_PASSWORD_EMAIL = "CHANGE_PASSWORD_EMAIL";
const sendMail = (dest, link, username, type) => {
    let mailOptions;
    const transporter = nodemailer.createTransport({
        host: "ssl0.ovh.net",
        port: 587,
        secure: false,
        auth: {
            user: exports.SMTP_USERNAME,
            pass: exports.SMTP_SECRET,
        },
        tls: {
            ciphers: "SSLv3",
        },
    });
    switch (type) {
        case exports.ACTIVATION_EMAIL: {
            mailOptions = {
                from: "no-reply@koodibril.com",
                to: dest,
                subject: "Activate your account",
                text: "Welcome to clean-app " +
                    username +
                    "! To activate your account, click on this link : http://localhost:8080/auth/activate/" +
                    link,
            };
            break;
        }
        case exports.CHANGE_PASSWORD_EMAIL: {
            mailOptions = {
                from: "no-reply@koodibril.com",
                to: dest,
                subject: "Change your password",
                text: "Hello " +
                    username +
                    "! To change your password, click on this link : http://localhost:8080/auth/password/" +
                    link,
            };
            break;
        }
        default: {
            return;
        }
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
};
exports.sendMail = sendMail;
//# sourceMappingURL=mailer.js.map