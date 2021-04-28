import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../index.css";
import App from "./App";
import "../App.css";
import { userService } from "../service";
import Profile from "./profile";
import Episodes from "./episodes";
import Alerts from "./alerts";
import photo from "../images/photo.png";
import {
  Route,
  NavLink,
  Link,
  BrowserRouter as Router
} from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      basicInfo: {}
    };
  }
  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("oneUser"))
    });

    userService
      .getBasicInfo(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).user_id,
        JSON.parse(localStorage.getItem("oneUser")).token
      )
      .then(data => this.setState({ basicInfo: data }));
   
  }

  render() {
    const { basicInfo } = this.state;
    return (
      <Router>
        <div className="App">
          <header className="App-header" />
          <body>
            <div class="row">
              <div class="column1">
                <img src={photo} alt="Photo" />
                <div class="left-container">
                  <h3>
                    {basicInfo.firstname} {basicInfo.surname}
                  </h3>

                  <div class="editor">
                    <a href="/login">Sign out</a>
                  </div>
                </div>
              </div>

              <div class="column2">
                <nav class="topnav">
                  <NavLink
                    exact
                    to="/"
                    className="nav-style"
                    activeClassName="selectedLink"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className="nav-style"
                    activeClassName="selectedLink"
                  >
                    {" "}
                    Profile
                  </NavLink>
                  <NavLink
                    to="/episodes"
                    className="nav-style"
                    activeClassName="selectedLink"
                  >
                    {" "}
                    Episodes
                  </NavLink>
                  <NavLink
                    to="/alerts"
                    className="nav-style"
                    activeClassName="selectedLink"
                  >
                    {" "}
                    Alerts
                  </NavLink>
                </nav>

                <div class="main-place">
                  <Route exact path="/" render={props => <App {...props} />} />
                  <Route
                    path="/profile"
                    render={props => <Profile {...props} />}
                  />
                  <Route path="/episodes" component={Episodes} />
                  <Route path="/alerts" component={Alerts} />
                </div>
              </div>
            </div>
          </body>
        </div>
      </Router>
    );
  }
}

export default Home;