import React, { Component } from 'react';
import './App.css';
import CreatePost from "./components/createpost.component";
import Posts from "./components/posts.component";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ourPicture from './our_picture.JPG';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: null,
        signedIn: false,
        user: ""
      };
      this.onSignIn = this.onSignIn.bind(this);
      this.onSignOut = this.onSignOut.bind(this);
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

  onSignOut(){
    this.setState({
      signedIn: false,
      user: ""
    });
  }

  render() {

    const blogDescription = "Hi there! We are Emily and Tara. We are seniors in EE461L this semester. We have been working on projects together since Freshman Year! We hope you enjoy our blog. Feel free to contribute (once you sign in) :)";

    return (
      <Router>
        <div className="container">
        <br/>
        <div className="navBar">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                {this.state.signedIn == true
                  ? <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create New Post</Link>
                  </li>
                  : <div/>
                }
              </ul>
            </div>
          </nav>
          {this.state.signedIn == false
            ? <div class="g-signin2" onClick= {this.onSignIn} data-onsuccess="onSignIn" data-theme="dark"></div>
            : <button onClick={this.onSignOut}>Sign Out</button>}
          </div>
          <br/>
          <div className="top-section">
            <div className="blog-main-header">
              <h1>Welcome to Our Blog</h1>
              <div className="blog-main-desc">{blogDescription}
              </div>
            </div>
           <img src={ourPicture} className="App-logo" alt="logo" />
          </div>
          <Route path="/" exact component={Posts} />
          <Route path="/create" render={(props) => <CreatePost {...props} user={this.state.user}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
