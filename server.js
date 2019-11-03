const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://stara04:tejkuru%2501@cluster0-exwb9.gcp.mongodb.net/test"
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   else{
    console.log('Connected...');
   }
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});

// FOR DEVELOPMENT
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// FOR PRODUCTION
// app.use(express.static(path.join(__dirname, "/client/build")));
//
// app.get("/*", (req, res) +> {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });
