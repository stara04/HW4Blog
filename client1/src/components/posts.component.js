import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const Post = props => (
    <tr>
        <td>{props.post.title}</td>
        <td>{props.post.content}</td>
        <td>{props.post.user}</td>
        <td>{props.post.date}</td>
    </tr>
)

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
            return <Post post={currentPost} key={i} />;
        })
    }

  render() {
         return (
             <div>
                 <h3>My Posts</h3>
                 <table className="table table-striped" style={{ marginTop: 20 }} >
                     <thead>
                         <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>User</th>
                            <th>Date</th>
                         </tr>
                     </thead>
                     <tbody>
                         { this.getPosts() }
                     </tbody>
                 </table>
             </div>
         )
     }
 }
