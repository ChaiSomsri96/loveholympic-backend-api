const Nexmo = require('nexmo');

const opts = {
  type: 'unicode',
};

const nexmo = new Nexmo({
  apiKey: process.env.NEXTMO_KEY,
  apiSecret: process.env.NEXTMO_SECRET,
});

const sendSMS = async (
  toNumber,
  text,
) => {
  nexmo.message.sendSms('Vonage APIs', toNumber, text, opts, (err, responseData) => {
    if (err) {
      console.log(err);
    } else if (responseData.messages[0].status === '0') {
      console.log('Message sent successfully.');
    } else {
      console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
    }
  });
};

export { sendSMS };
