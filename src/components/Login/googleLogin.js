import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { userService } from "../../service";

/**
 * component for google oauth
 * interface for creating a new user
 * no implementation of creating new users on api side yet
 */
const GOOGLE_CLIENT_ID =
  "815948051102-phukld82ajlo50r9i5kue5arhmp4hclr.apps.googleusercontent.com";
class OAuth extends Component {
  constructor() {
    super();

    this.state = {
      isAuthenticated: false,
      client: {
        client_id: "",
        token: "",
        name: ""
      }
    };
  }

  logout = () => {
    this.setState({ isAuthenticated: false, client: null });
  };

  onFailure = error => {};

  googleResponse = response => {
    this.setState({
      client: {
        ...this.state.client,
        client_id: response.googleID,
        token: response.access_token
      }
    });
  };

  render() {
    let content = !!this.state.isAuthenticated ? (
      <div>
        <p>Authenticated</p>
        <div>{this.state.client.client_id}</div>
        <div>
          <button onClick={this.logout} className="button">
            Log out
          </button>
        </div>
      </div>
    ) : (
      <div>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
        />
      </div>
    );

    return <div className="App">{content}</div>;
  }
}
export default OAuth;