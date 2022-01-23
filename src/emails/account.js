const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//   to: 'eparks1860@gmail.com',
//   from: 'eparks1860@gmail.com',
//   subject: 'This is my first email.',
//   text: 'I hope this one actually gets to you.',
// });

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'eparks1860@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app ${name}!  Let me know how you get along with the app!`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'eparks1860@gmail.com',
    subject: 'Sorry to see you go!',
    text: `We are sorry to see you leave ${name}!  Is there anything that we could have done to keep you around?`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
