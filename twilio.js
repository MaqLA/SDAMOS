require("dotenv").config();
const accountSid = "ACcd82dd7fa42a15b884e54dffc755f2f2";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.twilioMessage = function(messageText){
    client.messages.create({
        body: messageText,
        from: "+17207346497",
        to: "+60142336004"
    }).then(message => console.log(message.sid));
}

// e.164 format
// Twilio # : +17207346497
