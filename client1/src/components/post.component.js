import React, { Component } from 'react';
import '../App.css';

export default class Post extends Component {


  render() {

    const date = Date.parse(this.props.post.date);
    const dateString = new Date(date).toLocaleString();

         return (
           <div className={
             this.props.mode === "light"
             ? "blog-post-light"
             : "blog-post-dark"}>
             <div className={
               this.props.mode === "light"
               ? "blog-title-light"
               : "blog-title-dark"}>
                {this.props.post.title}
              </div>
                <div className="blog-desc">
                  by:  {this.props.post.user} on  {dateString}
                </div>
                <div className={
                  this.props.mode === "light"
                  ? "blog-content-light"
                  : "blog-content-dark"}>
                  {this.props.post.content}
                </div>
            </div>
         )
     }
 }
