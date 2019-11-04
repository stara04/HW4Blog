import React, { Component } from 'react';
import '../App.css';

export default class Post extends Component {


  render() {

    const date = Date.parse(this.props.post.date);
    const dateString = new Date(date).toLocaleString();

         return (
            <div className="blog-post">
              <div className="blog-title">
                {this.props.post.title}
              </div>
                <div className="blog-desc">
                  by:  {this.props.post.user} on  {dateString}
                </div>
                <div className="blog-content">
                  {this.props.post.content}
                </div>
            </div>
         )
     }
 }
