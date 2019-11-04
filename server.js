const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;
var cron = require('node-cron');
const nodeMailer = require('nodemailer');

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
    subject: 'Hello there!', // Subject line
    text: 'A Message from Node Cron App', // plain text body
    html: '<b>A Message from Node Cron App</b>' // html body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    console.log(info.messageId);
    if (err) {
      console.log(err);
    }
  });

  console.log('end email');

});



const path = require("path");

const postRouter = require('./routes/PostRoutes.js');


// replace the uri string with your connection string.
const uri = "mongodb+srv://stara04:tejkuru%2501@cluster0-exwb9.gcp.mongodb.net/test"

mongoose.connect(uri, {
  useNewUrlParser: true
});

app.use(postRouter);

// MongoClient.connect(uri, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    else{
//     console.log('Connected...');
//    }
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });

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
