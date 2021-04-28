import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import LoginForm from "./components/Login/login.js";
import * as serviceWorker from "./serviceWorker";
import Home from "./components/home";
import App from "./components/App";
import { PrivateRoute } from "./privateRoute";
import { configureBackend } from "./backend";
import { Route, BrowserRouter as Router } from "react-router-dom";

configureBackend();
const routing = (
  <Router>
    <Route path="/login" component={LoginForm} />
    <PrivateRoute exact path="/" component={Home} />
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();