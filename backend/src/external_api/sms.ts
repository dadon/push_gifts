
let client = null;


export function sendSms(phone: string, message: string) {
    if (!client) {
         client = require("twilio")(process.env.TWILLIO_SID, process.env.TWILLIO_TOKEN);
    }

    return client.messages
        .create({
            body: message,
            from: "+12029317097",
            to: phone,
        }).catch(er => console.error(er));
}
