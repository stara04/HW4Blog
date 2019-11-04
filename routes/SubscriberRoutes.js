const express = require('express');
// const postModel = require('../models/post');
const subscriberModel = require('../models/SubscriberModel');
const app = express();

app.get('/subscribers', async (req, res) => {
  const subscribers = await subscriberModel.find({});

  try {
    res.send(subscribers);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/subscriber', async (req, res) => {
  const subscriber = new subscriberModel(req.body);

  try {
    await subscriber.save();
    res.send(subscriber);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app
