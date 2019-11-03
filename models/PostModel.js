const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
},
  title: {
    type: String,
    required: true,
},
  content: {
    type: String,
    required: true
},
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
