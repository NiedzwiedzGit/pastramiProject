const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.get('*', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.get('/api', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});
app.post('/api/mail', (req, res) => {


  // create reusable transporter object using the default SMTP transport service: 'gmail',
  //let transporter = nodemailer.createTransport(transport[, defaults])
  const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
      // user: 'katlyn16@ethereal.email',
      // pass: 'AcwaqnbqXtEXHaGnDA'
      user: 'shkliarskiyigor@gmail.com',
      pass: '42091klak'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'shkliarskiyigor@gmail.com',
    subject: 'Sending Email using Node.js',
    text: `That was easy! ${req.body.post}`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    //console.log("transporter ", req.body);
    if (error) {
      // console.log("asdasd", error);
    } else {
      //console.log('Email sent: ' + info.response);
    }
  })




  //console.log("test post mail ", mailOptions)

  res.send(

    // `I received your POST request. This is what you sent me2: ${req.body.post}`,
    // transporter.sendMail(mailOptions, function (error, info) {
    //   console.log("transporter ", req.body);
    //   if (error) {
    //     console.log("asdasd", error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // })
  );
});

async function test() {
  try {
    await sendEmail(req);
    return res.redirect('/about?send=success#contact')
  } catch (err) {
    return res.redirect('/about?send=fail#contact')
  }
}

app.listen(port, () => console.log(`Listening on port ${port}`));
exports.api = functions.https.onRequest(app)