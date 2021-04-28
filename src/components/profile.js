import React, { Component } from "react";
import "../App.css";
import { Col, Row, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TabContainer, TabPane, TabContent } from "react-bootstrap";
import { userService } from "../service";
import BasicInfo from "./Edit/basicInfo";
import EditProfile from "./Edit/editProfile";
import EditContact from "./Edit/editContact";
import EditCaregivers from "./Edit/editCaregivers";

/**
 * Profile page
 * implemented with tabbed components
 * editable subpages are contained in components:
 * BasicInfo, EditProfile, EditCaregivers, EditContact
 */
class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);

    const clientToEdit = JSON.parse(localStorage.getItem("physician"));
    this.state = {
      physician: clientToEdit
    };
  }
  componentDidMount() {}
  render() {
    const { physician } = this.state;

    return (
      <TabContainer
        id="left-tabs-example"
        className="tab-container"
        defaultActiveKey="first"
      >
        <Row>
          <Col sm={3}>
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="first"
                >
                  Basic Info
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="second"
                >
                  Health Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="third"
                >
                  Contact Info
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="fourth"
                >
                  Caregivers
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="fifth"
                >
                  Physicians
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <TabContent class="tab-content">
              <TabPane eventKey="first">
                <BasicInfo />
              </TabPane>
              <TabPane eventKey="second">
                <EditProfile />
              </TabPane>
              <TabPane eventKey="third">
                <EditContact />
              </TabPane>
              <TabPane eventKey="fourth">
                <EditCaregivers />
              </TabPane>
              <TabPane eventKey="fifth">
                <div>
                  {physician.map(p => (
                    <div class="inline">
                      <p>
                        <strong>From {p.Healthcare_provider_name}: </strong>{" "}
                      </p>
                      <ul>
                        <li>
                          <strong> Name:</strong> {p.physician_name}
                        </li>
                        <li>
                          <strong> Address:</strong> {p.address}
                        </li>
                        <li>
                          <strong> Phone:</strong> {p.number}
                        </li>
                      </ul>
                      <p />
                    </div>
                  ))}
                </div>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </TabContainer>
    );
  }
}

export default Profile;