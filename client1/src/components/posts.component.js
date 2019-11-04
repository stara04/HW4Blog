import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from './post.component'

export default class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      signedIn: false,
      user: ""
    };

    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn(googleUser) {

    if (process.env.NODE_ENV === "production"){
      console.log("oops, going to the wrong place");
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      let name = profile.getName();
      console.log('Full Name: ' + profile.getName());
      console.log("Email: " + profile.getEmail());

      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
      this.setState({
        signedIn: true,
        user: name
      });
    } else{
      this.setState({
        signedIn: true,
        user: "testUser1"
      });
      console.log("signed in!");
    }

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
                 <div class="g-signin2" onClick= {this.onSignIn} data-onsuccess="onSignIn" data-theme="dark"></div>
                 <h3>Our Posts</h3>
                { this.getPosts() }
             </div>
         )
     }
 }
