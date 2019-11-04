import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from './post.component'

export default class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {posts: []};
  }

  componentDidMount() {
      axios.get('/posts/')
          .then(response => {
              this.setState({ posts: response.data });
          })
          .catch(function (error){
              console.log(error);
          })
  }

  getPosts() {
        return this.state.posts.map(function(currentPost, i){
            return <Post post={currentPost} />;
        })
    }

  render() {
         return (
             <div>
                 <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
                 <h3>Our Posts</h3>
                { this.getPosts() }
             </div>
         )
     }
 }
