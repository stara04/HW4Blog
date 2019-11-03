import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePost extends Component {

  constructor(props) {
    super(props);

    this.state = {
        title: '',
        content: '',
        user: '',
        blogDate: '',
    }

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

onChangeTitle(e) {
  this.setState({
      title: e.target.value
  });
}

  onChangeContent(e) {
    this.setState({
        content: e.target.value
    });
}

  onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Blog Content: ${this.state.content}`);

        const newPost = {
            title: this.state.title,
            content: this.state.content,
            user: "Emily Ginsburg",
            date: Date()
        };

        axios.post('/post', newPost)
            .then(res => console.log(res.data));

        this.setState({
            title: '',
            content: '',
        })
    }

    render() {
     return (
         <div style={{marginTop: 10}}>
             <h3>Create New Blog Post</h3>
             <form onSubmit={this.onSubmit}>
             <div className="form-group">
                 <label>Blog Post Title: </label>
                 <input  type="text"
                         className="form-control"
                         value={this.state.title}
                         onChange={this.onChangeTitle}
                         />
             </div>
                 <div className="form-group">
                     <label>Enter Post Here: </label>
                     <input  type="text"
                             className="form-control"
                             value={this.state.content}
                             onChange={this.onChangeContent}
                             />
                 </div>
                 <div className="form-group">
                     <input type="submit" value="Create Post" className="btn btn-primary" />
                 </div>
             </form>
         </div>
     )
 }
}
