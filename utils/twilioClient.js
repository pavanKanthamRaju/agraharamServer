require('dotenv').config();
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSms({ to, body, from = process.env.TWILIO_FROM_NUMBER }) {
    console.log("semnd sms has been hit...")
  if (!to) throw new Error('Missing "to" phone number');
  // ensure E.164 format on `to` in your caller
  return client.messages.create({ to, from, body });
}

module.exports = { sendSms };
