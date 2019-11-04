const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
    email: {
      type: String,
      required: true,
  }
});

const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
module.exports = Subscriber;
