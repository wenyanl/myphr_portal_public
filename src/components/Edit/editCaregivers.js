import React, { Component } from "react";
import "../../App.css";
import { userService } from "../../service";
import { ButtonToolbar, Button } from "react-bootstrap";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";

/**
 * Profile Caregivers subpage
 * there are two caregivers: primary and second
 * patients are allowed to modify each row
 * caregivers' names and relationships are taken care of by one api call
 * other contact info are taken care of by another api call
 * each update calls api one time
 */

class EditCaregivers extends React.Component {
  constructor(props, context) {
    super(props, context);
    const clientToEdit = JSON.parse(localStorage.getItem("caregiver"));
    this.state = {
      isLoading: true,
      caregiver: clientToEdit,
      isEditCaregivers: false,
      isAddContact: false,
      name: "",
      relationship: "",
      is_primary: true,
      primaryName: [],
      primaryRelationship: [],
      newPN: "",
      newPR: "",
      secondName: [],
      secondRelationship: [],
      newSPN: "",
      newSPR: "",
      errors: "",
      //break caregivers' contact info down to address, phone and email
      id1: clientToEdit.filter(word => word.is_primary == true)[0].client_id,
      id2: clientToEdit.filter(word => word.is_primary == false)[0].client_id
    };
    this.editCancel = this.editCancel.bind(this);
    this.editCaregivers = this.editCaregivers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

    this.handleChangeP = this.handleChangeP.bind(this);
    this.handleChangeS = this.handleChangeS.bind(this);

    this.handleChangeSCP = this.handleChangeSCP.bind(this);
    this.handleChangeSHP = this.handleChangeSHP.bind(this);
    this.handleChangePCP = this.handleChangePCP.bind(this);
    this.handleChangePHP = this.handleChangePHP.bind(this);
  }

  componentDidMount() {
    /* edit name or relationship */

    //primary contact
    const result = this.state.caregiver.filter(word => word.is_primary == true);
    var t = [];
    var r = [];

    for (let i = 0; i < result.length; i++) {
      t.push(result[i].name);
      r.push(result[i].relationship);
    }

    this.setState({
      primaryName: t,
      primaryRelationship: r,
      newPN: t,
      newPR: r
    });

    //second contact
    const result2 = this.state.caregiver.filter(
      word => word.is_primary == false
    );
    var t2 = [];
    var r2 = [];

    for (let i = 0; i < result2.length; i++) {
      t2.push(result2[i].name);
      r2.push(result2[i].relationship);
    }

    this.setState({
      secondName: t2,
      secondRelationship: r2,
      newSPN: t2,
      newSPR: r2
    });
    this.setState({});

    /* get caregivers' contact info */

    //primary
    userService
      .getCaregiverContactInfo(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1,
        this.state.id1
      )

      .then(data => {
        if (data[1][1].filter(word => word.type === "home").length != 0) {
          this.setState({
            homePhone: data[1][1].filter(word => word.type == "home")[0].number,
            newHP: data[1][1].filter(word => word.type == "home")[0].number
          });
        } else {
          this.setState({
            homePhone: data[1][1].filter(word => word.type == "home")[0],
            newHP: data[1][1].filter(word => word.type == "home")[0]
          });
        }

        if (data[1][1].filter(word => word.type === "cell").length != 0) {
          this.setState({
            cellPhone: data[1][1].filter(word => word.type == "cell")[0].number,
            newCP: data[1][1].filter(word => word.type == "cell")[0].number
          });
        } else {
          this.setState({
            cellPhone: data[1][1].filter(word => word.type == "cell")[0],
            newCP: data[1][1].filter(word => word.type == "cell")[0]
          });
        }

        if (data[0][1].filter(word => word.type === "home").length != 0) {
          this.setState({
            homeAddress: data[0][1].filter(word => word.type == "home")[0]
              .address,
            newHA: data[0][1].filter(word => word.type == "home")[0].address
          });
        } else {
          this.setState({
            homeAddress: data[0][1].filter(word => word.type == "home")[0],
            newHA: data[0][1].filter(word => word.type == "home")[0]
          });
        }
        if (data[0][1].filter(word => word.type === "mailing").length != 0) {
          this.setState({
            mailingAddress: data[0][1].filter(word => word.type == "mailing")[0]
              .address,
            newMA: data[0][1].filter(word => word.type == "mailing")[0].address
          });
        } else {
          this.setState({
            mailingAddress: data[0][1].filter(
              word => word.type == "mailing"
            )[0],
            newMA: data[0][1].filter(word => word.type == "mailing")[0]
          });
        }

        this.setState({
          email: data[2][1],
          newEmail: data[2][1]
        });
      });

    //second:
    userService
      .getCaregiverContactInfo(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1,
        this.state.id2
      )

      .then(data => {
        if (data[1][1].filter(word => word.type === "home").length != 0) {
          this.setState({
            homePhone2: data[1][1].filter(word => word.type == "home")[0]
              .number,
            newHP2: data[1][1].filter(word => word.type == "home")[0].number
          });
        } else {
          this.setState({
            homePhone2: data[1][1].filter(word => word.type == "home")[0],
            newHP2: data[1][1].filter(word => word.type == "home")[0]
          });
        }

        if (data[1][1].filter(word => word.type === "cell").length != 0) {
          this.setState({
            cellPhone2: data[1][1].filter(word => word.type == "cell")[0]
              .number,
            newCP2: data[1][1].filter(word => word.type == "cell")[0].number
          });
        } else {
          this.setState({
            cellPhone2: data[1][1].filter(word => word.type == "cell")[0],
            newCP2: data[1][1].filter(word => word.type == "cell")[0]
          });
        }

        if (data[0][1].filter(word => word.type === "home").length != 0) {
          this.setState({
            homeAddress2: data[0][1].filter(word => word.type == "home")[0]
              .address,
            newHA2: data[0][1].filter(word => word.type == "home")[0].address
          });
        } else {
          this.setState({
            homeAddress2: data[0][1].filter(word => word.type == "home")[0],
            newHA2: data[0][1].filter(word => word.type == "home")[0]
          });
        }
        if (data[0][1].filter(word => word.type === "mailing").length != 0) {
          this.setState({
            mailingAddress2: data[0][1].filter(
              word => word.type == "mailing"
            )[0].address,
            newMA2: data[0][1].filter(word => word.type == "mailing")[0].address
          });
        } else {
          this.setState({
            mailingAddress2: data[0][1].filter(
              word => word.type == "mailing"
            )[0],
            newMA2: data[0][1].filter(word => word.type == "mailing")[0]
          });
        }

        this.setState({
          email2: data[2][1],
          newEmail2: data[2][1]
        });
      });
  }

  editCancel() {
    this.setState({
      isEditCaregivers: false,
      newPN: this.state.primaryName,
      newPR: this.state.primaryRelationship,
      newSPN: this.state.secondName,
      newSPR: this.state.secondRelationship,
      newHA: this.state.homeAddress,
      newMA: this.state.mailingAddress,

      newCP: this.state.cellPhone,
      newHP: this.state.homePhone,
      newEmail: this.state.email,
      newHA2: this.state.homeAddress2,
      newMA2: this.state.mailingAddress2,

      newCP2: this.state.cellPhone2,
      newHP2: this.state.homePhone2,
      newEmail2: this.state.email2
    });
  }
  editCaregivers() {
    this.setState({
      isEditCaregivers: true
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleChange2(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //primary contact info change
  handleChangeP(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  //second
  handleChangeS(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleChangeSCP(value) {
    this.setState({
      newCP2: value
    });
  }
  handleChangePCP(value) {
    this.setState({
      newCP: value
    });
  }
  handleChangeSHP(value) {
    this.setState({
      newHP2: value
    });
  }
  handleChangePHP(value) {
    this.setState({
      newHP: value
    });
  }

  TOKEN = JSON.parse(localStorage.getItem("oneUser")).token;
  ID = JSON.parse(localStorage.getItem("oneUser")).client_id;

  handleValidation() {
    let email = this.state.newEmail;
    let email2 = this.state.newEmail2;
    let errors = {};
    let formIsValid = true;

    //Email

    if (typeof email !== "undefined") {
      let lastAtPos = email.lastIndexOf("@");
      let lastDotPos = email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }
  handleSubmit(event) {
    event.preventDefault();

    //primary
    if (
      this.state.newPN == this.state.primaryName &&
      this.state.newPR == this.state.primaryRelationship
    ) {
    } else {
      userService.editCaregivers(
        this.ID,
        this.TOKEN,
        this.state.newPN,
        this.state.newPR,
        true
      );
      this.setState({
        primaryName: this.state.newPN,
        primaryRelationship: this.state.newPR
      });
    }
    //second
    if (
      this.state.newSPN == this.state.secondName &&
      this.state.newSPR == this.state.secondRelationship
    ) {
    } else {
      userService.editCaregivers(
        this.ID,
        this.TOKEN,
        this.state.newSPN,
        this.state.newSPR,
        false
      );
      this.setState({
        secondName: this.state.newSPN,
        secondRelationship: this.state.newSPR
      });
    }

    /* Primary contact info */
    //mailing address
    if (this.state.newMA == this.state.mailingAddress) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "address",
        this.state.newMA,
        "mailing",
        1
      );
      this.setState({ mailingAddress: this.state.newMA });
    }

    //home address
    if (this.state.newHA == this.state.homeAddress) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "address",
        this.state.newHA,
        "home",
        1
      );
      this.setState({ homeAddress: this.state.newHA });
    }

    //cell phone
    if (this.state.newCP == this.state.cellPhone) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "phone",
        this.state.newCP,
        "cell",
        1
      );
      this.setState({ cellPhone: this.state.newCP });
    }
    //home phone
    if (this.state.newHP == this.state.homePhone) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "phone",
        this.state.newHP,
        "home",
        1
      );
      this.setState({ homePhone: this.state.newHP });
    }

    //email
    if (this.state.newEmail == this.state.email) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "email",
        this.state.newEmail,
        "main",
        1
      );
      this.setState({ email: this.state.newEmail });
    }

    /* Second contact info */

    //mailing address
    if (this.state.newMA2 == this.state.mailingAddress2) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "address",
        this.state.newMA2,
        "mailing",
        0
      );
      this.setState({ mailingAddress2: this.state.newMA2 });
    }

    //home address
    if (this.state.newHA2 == this.state.homeAddress2) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "address",
        this.state.newHA2,
        "home",
        0
      );
      this.setState({ homeAddress2: this.state.newHA2 });
    }

    //cell phone
    if (this.state.newCP2 == this.state.cellPhone2) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "phone",
        this.state.newCP2,
        "cell",
        0
      );
      this.setState({ cellPhone2: this.state.newCP2 });
    }
    //home phone
    if (this.state.newHP2 == this.state.homePhone2) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "phone",
        this.state.newHP2,
        "home",
        0
      );
      this.setState({ homePhone2: this.state.newHP2 });
    }

    //email
    if (this.state.newEmail2 == this.state.email2) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "email",
        this.state.newEmail2,
        "main",
        0
      );
      this.setState({ email2: this.state.newEmail2 });
    }
    this.setState({ isEditCaregivers: false });
  }

  render() {
    const { caregiver, isEditCaregivers } = this.state;

    return (
      <div>
        {!isEditCaregivers ? (
          <div>
            <div>
              <div class="primary-contact">
                <p>
                  <strong>Primary Contact:</strong>{" "}
                </p>
                <ul>
                  <li>
                    <strong>Name: </strong>
                    {this.state.primaryName}
                  </li>
                  <li>
                    <strong> Relationship:</strong>{" "}
                    {this.state.primaryRelationship}
                  </li>
                  <li>
                    <strong> Home Address: </strong> {this.state.homeAddress}
                  </li>
                  <li>
                    <strong> Mailing Address: </strong>{" "}
                    {this.state.mailingAddress}
                  </li>
                  <li>
                    <strong>Cell Phone: </strong>
                    {this.state.cellPhone}
                  </li>
                  <li>
                    <strong> Home Phone:</strong> {this.state.homePhone}
                  </li>
                  <strong> Email:</strong> {this.state.email}
                </ul>
              </div>
              <div>
                <p>
                  <strong>Second Contact:</strong>{" "}
                </p>
                <ul>
                  <li>
                    {" "}
                    <strong>Name: </strong>
                    {this.state.secondName}
                  </li>
                  <li>
                    <strong> Relationship:</strong>{" "}
                    {this.state.secondRelationship}{" "}
                  </li>
                  <li>
                    <strong> Home Address: </strong> {this.state.homeAddress2}
                  </li>
                  <li>
                    <strong> Mailing Address: </strong>{" "}
                    {this.state.mailingAddress2}
                  </li>
                  <li>
                    <strong>Cell Phone: </strong>
                    {this.state.cellPhone2}
                  </li>
                  <li>
                    <strong> Home Phone:</strong> {this.state.homePhone2}
                  </li>
                  <strong> Email:</strong> {this.state.email2}
                </ul>
              </div>
            </div>

            <Button variant="outline-primary" onClick={this.editCaregivers}>
              Edit
            </Button>
          </div>
        ) : (
          <div>
            <div className="edit-scroll">
              <div>
                <div>
                  <p>
                    <strong>Primary Contact:</strong>{" "}
                  </p>
                  <ul>
                    <div class="form-group">
                      <label for="newPN">Name:</label>
                      <input
                        value={this.state.newPN}
                        onChange={this.handleChange}
                        name="newPN"
                      />
                    </div>

                    <li>
                      <strong> Relationship:</strong>{" "}
                      <select
                        value={this.state.newPR}
                        onChange={this.handleChange}
                        name="newPR"
                      >
                        <option value="father">father</option>
                        <option value="mother">mother</option>
                      </select>
                    </li>
                    <li>
                      <strong> Home Address: </strong>{" "}
                      <input
                        class="form-control"
                        placeholder="home address"
                        value={this.state.newHA || ""}
                        onChange={this.handleChangeP}
                        name="newHA"
                      />
                    </li>
                    <li>
                      <strong> Mailing Address:</strong>{" "}
                      <input
                        class="form-control"
                        placeholder="mailing address"
                        value={this.state.newMA || ""}
                        onChange={this.handleChangeP}
                        name="newMA"
                      />
                    </li>
                    <li>
                      <strong>Cell Phone: </strong>
                      <ReactPhoneInput
                        placeholder="Enter phone number"
                        defaultCountry={"ca"}
                        value={this.state.newCP || ""}
                        onChange={this.handleChangePCP}
                      />
                    </li>
                    <li>
                      <strong> Home Phone:</strong>{" "}
                      <ReactPhoneInput
                        placeholder="Enter phone number"
                        defaultCountry={"ca"}
                        value={this.state.newHP || ""}
                        onChange={this.handleChangePHP}
                      />
                    </li>
                    <strong> Email:</strong>
                    <input
                      class="form-control"
                      type="email"
                      value={this.state.newEmail}
                      onChange={this.handleChangeP}
                      name="newEmail"
                    />
                  </ul>
                </div>

                <div>
                  <p>
                    <strong>Second Contact:</strong>{" "}
                  </p>
                  <ul>
                    <div class="form-group">
                      <label for="newSPN">Name:</label>
                      <input
                        value={this.state.newSPN}
                        onChange={this.handleChange2}
                        name="newSPN"
                      />
                    </div>

                    <li>
                      <strong> Relationship:</strong>{" "}
                      <select
                        value={this.state.newSPR}
                        onChange={this.handleChange2}
                        name="newSPR"
                      >
                        <option value="father">father</option>
                        <option value="mother">mother</option>
                        <option value="uncle">uncle</option>
                        <option value="aunt">aunt</option>
                      </select>
                    </li>
                    <li>
                      <strong> Home Address: </strong>{" "}
                      <input
                        class="form-control"
                        placeholder="home address"
                        value={this.state.newHA2 || ""}
                        onChange={this.handleChangeS}
                        name="newHA2"
                      />
                    </li>
                    <li>
                      <strong> Mailing Address:</strong>{" "}
                      <input
                        class="form-control"
                        placeholder="mailing address"
                        value={this.state.newMA2 || ""}
                        onChange={this.handleChangeS}
                        name="newMA2"
                      />
                    </li>
                    <li>
                      <strong>Cell Phone: </strong>
                      <ReactPhoneInput
                        placeholder="Enter phone number"
                        defaultCountry={"ca"}
                        value={this.state.newCP2 || ""}
                        onChange={this.handleChangeSCP}
                      />
                    </li>
                    <li>
                      <strong> Home Phone:</strong>{" "}
                      <ReactPhoneInput
                        placeholder="Enter phone number"
                        defaultCountry={"ca"}
                        value={this.state.newHP2 || ""}
                        onChange={this.handleChangeSHP}
                      />
                    </li>
                    <strong> Email:</strong>
                    <input
                      class="form-control"
                      type="email"
                      value={this.state.newEmail2}
                      onChange={this.handleChangeS}
                      name="newEmail2"
                    />
                  </ul>
                </div>
              </div>
            </div>
            <ButtonToolbar>
              <Button variant="outline-primary" onClick={this.handleSubmit}>
                Save
              </Button>
              <Button variant="outline-primary" onClick={this.editCancel}>
                Cancel
              </Button>
            </ButtonToolbar>
          </div>
        )}
      </div>
    );
  }
}

export default EditCaregivers;
