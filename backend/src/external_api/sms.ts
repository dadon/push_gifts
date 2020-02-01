const client = require("twilio")(process.env.TWILLIO_SID, process.env.TWILLIO_TOKEN);

export function sendSms(phone: string, message: string) {
    return client.messages
        .create({
            body: message,
            from: "+12029317097",
            to: phone,
        }).catch(er => console.error(er));
}
