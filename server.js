const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;
var cron = require('node-cron');
const nodeMailer = require('nodemailer');


const path = require("path");

const postRouter = require('./routes/PostRoutes.js');

// replace the uri string with your connection string.
const uri = "mongodb+srv://stara04:tejkuru%2501@cluster0-exwb9.gcp.mongodb.net/test"

mongoose.connect(uri, {
  useNewUrlParser: true
});

app.use(postRouter);

cron.schedule('0 17 * * *', () => {
  console.log('start email');

  let transporter = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'loren81@ethereal.email', // generated ethereal user
        pass: 'DM49BKpkVukYA3y46m' // generated ethereal password
      }
  });

  const mailOptions = {
    from: '"John Doe" <john.doe@example.com>', // sender address
    to: 'loren81@ethereal.email', // list of receivers
    subject: 'An Update from Tara and Emily', // Subject line
    text: 'Check out our latest posts!', // plain text body
    html: '<b>Check out our latest posts <a href="https://ourblog-257721.appspot.com/">here!</a></b>' // html body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    console.log(info.messageId);
    if (error) {
      console.log(error);
    }
  });

  console.log('end email');

});





// FOR DEVELOPMENT
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


// FOR PRODUCTION
if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/client1/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client1/build/index.html"));
  });
}
