import React, { Component } from 'react';
import './App.css';
import CreatePost from "./components/createpost.component";
import Posts from "./components/posts.component";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ourPicture from './our_picture.JPG';

class App extends Component {
state = {
    data: null
  };

  // componentDidMount() {
  //     // Call our fetch function below once the component mounts
  //   this.callBackendAPI()
  //     .then(res => this.setState({ data: res.express }))
  //     .catch(err => console.log(err));
  // }
  //   // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  // callBackendAPI = async () => {
  //   const response = await fetch('/express_backend');
  //   const body = await response.json();
  //
  //   if (response.status !== 200) {
  //     throw Error(body.message)
  //   }
  //   return body;
  // };

  render() {
    return (
      <Router>
        <div className="container">
        <br/>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create New Post</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <div className="top-section">
            <div className="blog-main-header">
              <h1>Welcome to Our Blog</h1>
              <div className="blog-main-desc">Hi there! We are Emily and Tara. We are seniors in EE461L this semester. We have been working on projects together since Freshman Year! We hope you enjoy our blog. Feel free to contribute (once you sign in) :)
              </div>
              </div>
           <img src={ourPicture} className="App-logo" alt="logo" />
          </div>
          <Route path="/" exact component={Posts} />
          <Route path="/create" component={CreatePost} />
        </div>
      </Router>
    );
  }
}

export default App;
