import React, { Component } from "react";
import "../App.css";
import { userService } from "../service";

/**
 * Alerts page
 * hard coded text currently
 * getting date from mock api
 * no implementation in real api yet
 */
class Alerts extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      alerts: {},
      tag: []
    };
  }
  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("user")),
      client: JSON.parse(localStorage.getItem("client"))
    });

    userService.getAlerts().then(data =>
      this.setState({
        alerts: JSON.parse(data),
        tag: JSON.parse(data).tags,
        isLoading: false
      })
    );
  }

  render() {
    const { tag, isLoading } = this.state;

    return (
      <div
        class="alerts-container"
        style={{
          position: "relative",
          height: "600px",
          overflow: "scroll",
          marginBottom: "100px",
          border: "0.1px solid white"
        }}
      >
        <div>
          <div class="alert-links">
            <a href="#news">Edit alerts</a>
          </div>
          <br />

          <h5>Active Alerts:</h5>

          {isLoading ? (
            <div>is loading...</div>
          ) : (
            <div>
              {tag.map(t => (
                <div>
                  {t.type === "access_notification" ? (
                    <div>
                      <strong> ** Access Notification:</strong>
                      <ul>
                        <li>
                          You receive an email everytime a user accesses your
                          records
                        </li>
                        <li>Configured on: {t.configured_on}</li>
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <strong> ** Activity Report:</strong>
                      <ul>
                        <li>You receive an activity report quarterly</li>
                        <li>Configured on: {t.configured_on}</li>
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Alerts;