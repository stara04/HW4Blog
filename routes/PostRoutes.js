const express = require('express');
// const postModel = require('../models/post');
const postModel = require('../models/PostModel');
const app = express();

app.get('/posts', async (req, res) => {
  const posts = await postModel.find({});

  try {
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/recentPosts', async (req, res) => {

  const todaysDate = new Date();
  const todaysDateParsed = Date.parse(todaysDate);
  const oneDayAgo = todaysDateParsed - 86400000;
  const posts = await postModel.find({});
  var recentPosts = [];
  posts.map(function(currentPost, i){
      const date = Date.parse(currentPost.date);
      if(date > oneDayAgo) {
          recentPosts.push(currentPost);
      }
  });

  try {
    res.send(recentPosts);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/post', async (req, res) => {
  const post = new postModel(req.body);

  try {
    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app
