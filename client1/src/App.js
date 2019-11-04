import React, { Component } from 'react';
import './App.css';
import CreatePost from "./components/createpost.component";
import Posts from "./components/posts.component";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ourPicture from './our_picture.JPG';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: null,
        signedIn: false,
        username: "",
        email: ""
      };
      this.onSignIn = this.onSignIn.bind(this);
      this.onSignOut = this.onSignOut.bind(this);
      this.setLight = this.setLight.bind(this);
      this.setDark = this.setDark.bind(this);
      this.onSubscribe = this.onSubscribe.bind(this);
      this.onSuccessSignIn = this.onSuccessSignIn.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  setLight() {
    if(this.state.mode !== "light") {
      this.setState({
        mode: "light"
      });
    }
  }

  setDark() {
    if(this.state.mode !== "dark") {
      this.setState({
        mode: "dark"
      });
    }
  }



  onSubscribe(e){
    e.preventDefault();

    console.log(this.state.username);
    console.log(this.state.email);

    const newSubscriber = {
      username: this.state.username,
      email: this.state.email
    };

    axios.post('/subscriber', newSubscriber)
         .then(res => console.log(res.data));

    console.log("you are subscribed!")
  }

  handleEmailChange(){
    let email = document.getElementById("email").value;
    console.log(email);
    this.setState({
      email: email
    });
  }

  handleNameChange(){
    let username = document.getElementById("username").value;
    console.log(username);
    this.setState({
      username: username
    });
  }

  onSuccessSignIn(googleUser){
    if (process.env.NODE_ENV === "production"){
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

  onSignIn(){
    this.setState({
      signedIn: true,
    });
  }

  onSignOut(){
    document.getElementById("email").value="";
    document.getElementById("username").value="";
    this.setState({
      signedIn: false,
      user: "",
      email: ""
    });
  }

  render() {

    const blogDescription = "Hi there! We are Emily and Tara. We are seniors in EE461L this semester. We have been working on projects together since Freshman Year! We hope you enjoy our blog. Feel free to contribute (once you sign in) :)";

    return (
      <Router>
      <div className={
        this.state.mode === "light"
        ? "main-light"
        : "main-dark"}>
        <br/>
        <div className="navBar">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                {this.state.signedIn === true
                  ? <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create New Post</Link>
                  </li>
                  : <div/>
                }
              </ul>
            </div>
          </nav>
          <input type="text" onChange={this.handleNameChange} placeholder="Enter User Name" id="username"/>
          <input type="text" onChange={this.handleEmailChange} placeholder="Enter Email" id="email"/>
          {this.state.signedIn === false
            ? <button onClick={this.onSignIn}>Sign In</button>
            : <button onClick={this.onSignOut}>Sign Out</button>}
          {this.state.signedIn === true
            ? <button onClick={this.onSubscribe}>Subscribe</button>
            : <div/>}
        </div>
          <br/>
          <div className="top-section">
            <div className="blog-main-header">
              <h1>Welcome to Our Blog</h1>
              <div className="blog-main-desc">{blogDescription}
              </div>
            </div>
           <img src={ourPicture} className="App-logo" alt="logo" />
           <Button variant="outline-dark" onClick={this.setLight}>Light Mode</Button>
           <Button variant="outline-dark" onClick={this.setDark}>Dark Mode</Button>
          </div>
          <Route path="/" exact render={(props) => <Posts {...props} mode={this.state.mode}/>}  />
          <Route path="/create" render={(props) => <CreatePost {...props} user={this.state.user}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
