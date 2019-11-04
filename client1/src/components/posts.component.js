import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from './post.component'

export default class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      mode: this.props.mode,
    };
  }

  componentDidMount() {
      axios.get('/posts/')
          .then(response => {
              this.setState({ posts: response.data.reverse() });
          })
          .catch(function (error){
              console.log(error);
          })
  }

  getPosts(mode) {
        return this.state.posts.map(function(currentPost, i){
            return <Post post={currentPost} key={i} mode={mode}/>;
        })
    }

  render() {
         return (
             <div>
             <br/>
                { this.getPosts(this.props.mode) }
             </div>
         )
     }
 }
