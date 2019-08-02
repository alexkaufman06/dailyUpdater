var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

var mailOptions = {
  from: 'process.env.EMAIL',
  to: 'process.env.EMAIL',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      type: 'OAuth2',
      user: 'user@example.com',
      clientId: '000000000000-xxx0.apps.googleusercontent.com',
      clientSecret: 'XxxxxXXxX0xxxxxxxx0XXxX0',
      refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
      accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x'
  }
});

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
