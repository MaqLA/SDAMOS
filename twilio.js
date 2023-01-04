require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.twilioMessage = function(messageText){
    client.messages.create({
        body: messageText,
        from: "[TWILIO_PHONE_NUMBER_E.164]",
        to: "[PHONE_NUMBER_E.164]"
    }).then(message => console.log(message.sid));
}

// e.164 format