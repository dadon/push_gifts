import * as nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export function sendMail(to: string, subj: string, text: string, textHtml?) {
    const message = {
        from: process.env.SMTP_FROM,
        to: to,
        subject: subj,
        text: text,
        html: textHtml,
    };

    transporter.sendMail(message, (err, info, response) => {
       if (err) {
           console.error("sendMail error", err);
           return;
       }

       console.log("sendMail success", info, response);
    });
}
