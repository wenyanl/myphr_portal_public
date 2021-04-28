import React, { Component } from "react";
import "../../App.css";
import { userService } from "../../service";
import { ButtonToolbar, Button, Form, InputGroup, Col } from "react-bootstrap";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";

/**
 * Profile Contact Info subpage
 * patients are allowed to modify each row
 * each update calls different api methods
 */
class EditContact extends React.Component {
  constructor(props, context) {
    super(props, context);
    const clientToEdit = JSON.parse(localStorage.getItem("contactInfo"));
    this.state = {
      isLoading: true,
      client: {},
      address: {},
      isEditContact: false,
      validated: false,
      query: "",
      locationId: "",
      isChecked: false,
      coords: {},
      data: {},

      phoneInfo: clientToEdit[1][1],
      emailInfo: clientToEdit[2][1],
      addressInfo: clientToEdit[0][1],

      errors: {}
    };
    this.editContact = this.editContact.bind(this);
    this.editCancel = this.editCancel.bind(this);

    // User has clicked the save button
    this.onCheck = this.onCheck.bind(this);

    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleOAChange = this.handleOAChange.bind(this);
    this.handleMAChange = this.handleMAChange.bind(this);
    this.handleHPChange = this.handleHPChange.bind(this);
    this.handleHAChange = this.handleHAChange.bind(this);

    this.handleEChange = this.handleEChange.bind(this);
  }

  componentDidMount() {
    //get values from contact info JSON array by filtering
    const ha = this.state.addressInfo.filter(word => word.type == "home");
    if (ha.length !== 0) {
      this.setState({ homeAddress: ha[0].address, newHA: ha[0].address });
    } else {
      this.setState({ homeAddress: ha[0], newHA: ha[0] });
    }

    const ma = this.state.addressInfo.filter(word => word.type == "mailing");
    if (ma.length !== 0) {
      this.setState({ mailingAddress: ma[0].address, newMA: ma[0].address });
    } else {
      this.setState({ mailingAddress: ma[0], newMA: ma[0] });
    }

    const oa = this.state.addressInfo.filter(word => word.type == "other");
    if (oa.length != 0) {
      this.setState({ otherAddress: oa[0].address, newOA: oa[0].address });
    } else {
      this.setState({ otherAddress: oa[0], newOA: oa[0] });
    }

    const cp = this.state.phoneInfo.filter(word => word.type == "cell");
    if (cp.length != 0) {
      this.setState({
        cellPhone: cp[0].number,
        newCP: cp[0].number
      });
    } else {
      this.setState({ cellPhone: cp[0], newCP: cp[0] });
    }

    const hp = this.state.phoneInfo.filter(word => word.type == "home");
    if (hp.length != 0) {
      this.setState({
        homePhone: hp[0].number,
        newHP: hp[0].number
      });
    } else {
      this.setState({ homePhone: hp[0], newHP: hp[0] });
    }

    this.setState({ newEmail: this.state.emailInfo });
  }
  editCancel() {
    this.setState({
      isEditContact: false,
      newHA: this.state.homeAddress,
      newMA: this.state.mailingAddress,
      newOA: this.state.otherAddress,
      newCP: this.state.cellPhone,
      newHP: this.state.homePhone,
      newEmail: this.state.emailInfo
    });
  }
  //enable edit page
  editContact() {
    this.setState({
      isEditContact: true
    });
  }

  //handle phone number change
  handlePhoneChange(value) {
    this.setState({
      newCP: value
    });
  }
  handleHPChange(value) {
    this.setState({
      newHP: value
    });
  }
  //handle addresses change
  handleHAChange(event) {
    this.setState({ newHA: event.target.value });
  }
  handleMAChange(event) {
    this.setState({ newMA: event.target.value });
  }
  handleOAChange(event) {
    this.setState({ newOA: event.target.value });
  }

  //validate email pattern
  handleValidation() {
    let fields = this.state.newEmail;

    let errors = {};
    let formIsValid = true;

    if (fields !== this.state.emailInfo) {
      if (typeof fields !== "undefined") {
        let lastAtPos = fields.lastIndexOf("@");
        let lastDotPos = fields.lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            fields.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            fields.length - lastDotPos > 2
          )
        ) {
          formIsValid = false;
          errors["email"] = "Email is not valid";
        }
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleEChange(e) {
    this.setState({ newEmail: e.target.value });
  }

  TOKEN = JSON.parse(localStorage.getItem("oneUser")).token;
  ID = JSON.parse(localStorage.getItem("oneUser")).client_id;
  //when validation (clicking save button)
  onCheck(event) {
    event.preventDefault();

    //validate email format
    if (this.handleValidation()) {
      //call edit apis:
      if (this.state.newHA == this.state.homeAddress) {
      } else {
        userService.editContactInfo(
          this.ID,
          this.TOKEN,
          "address",
          this.state.newHA,
          "home"
        );
        this.setState({ homeAddress: this.state.newHA });
      }

      //mailing address
      if (this.state.newMA == this.state.mailingAddress) {
      } else {
        userService.editContactInfo(
          this.ID,
          this.TOKEN,
          "address",
          this.state.newMA,
          "mailing"
        );
        this.setState({ mailingAddress: this.state.newMA });
      }

      //other address
      if (this.state.newOA == this.state.otherAddress) {
      } else {
        userService.editContactInfo(
          this.ID,
          this.TOKEN,
          "address",
          this.state.newOA,
          "other"
        );
        this.setState({ otherAddress: this.state.newOA });
      }

      //cell phone
      if (this.state.newCP == this.state.cellPhone) {
      } else {
        userService.editContactInfo(
          this.ID,
          this.TOKEN,
          "phone",
          this.state.newCP,
          "cell"
        );
        this.setState({ cellPhone: this.state.newCP });
      }
      //home phone
      if (this.state.newHP == this.state.homePhone) {
      } else {
        userService.editContactInfo(
          this.ID,
          this.TOKEN,
          "phone",
          this.state.newHP,
          "home"
        );
        this.setState({ homePhone: this.state.newHP });
      }

      //email
      if (this.state.newEmail == this.state.emailInfo) {
      } else {
        userService.editContactInfo(
          this.ID,
          this.TOKEN,
          "email",
          this.state.newEmail,
          "main"
        );
        this.setState({ emailInfo: this.state.newEmail });
      }

      this.setState({ isEditContact: false });
    } else {
      alert("Form has errors!");
    }
  }

  render() {
    const {
      isEditContact,
      addressInfo,
      phoneInfo,
      emailInfo,

      newHA,
      newMA,
      newOA,
      newCP,
      newHP,
      newEmail
    } = this.state;

    return (
      <div>
        {!isEditContact ? (
          <div>
            <p>
              <strong>Home Address: </strong>
              {this.state.homeAddress}
            </p>

            <p>
              <strong>Mailing Address: </strong>
              {this.state.mailingAddress}
            </p>
            <p>
              <strong>Other Address: </strong>
              {this.state.otherAddress}
            </p>
            <p>
              <strong>Cell Phone: </strong>
              {this.state.cellPhone}
            </p>
            <p>
              <strong>Home Phone: </strong>
              {this.state.homePhone}
            </p>
            <p>
              <strong>Email: </strong>
              {emailInfo}
            </p>

            <Button variant="outline-primary" onClick={this.editContact}>
              Edit
            </Button>
          </div>
        ) : (
          ///////////////////////////////////////EDIT ////////////////////////////////////////
          <div>
            <p>
              <strong>Home Address:</strong>{" "}
              <input
                class="form-control"
                placeholder="home address"
                value={newHA || ""}
                onChange={this.handleHAChange}
              />
              {/**

                <AddressSuggest
                  query={this.state.query}
                  value={address.street_number}
                  onChange={this.onQuery}
                  placeholder={address.street_number}
                />
                <input placeholder="city" value={address.city} /> ,{" "}
                <input placeholder="country" value={address.country} />,{" "}
                <input placeholder="postal code" value={address.postalCode} />
                
          <AddressInput
            street={this.state.address.street}
            city={this.state.address.city}
            state={this.state.address.state}
            postalCode={this.state.address.postalCode}
            country={this.state.address.country}
            onChange={this.onAddressChange}
          />
           <br />
                {result}*/}
            </p>

            <p>
              <strong>Mailing Address: </strong>
              <input
                class="form-control"
                placeholder="mailing address"
                value={newMA || ""}
                onChange={this.handleMAChange}
              />
            </p>
            <p>
              <strong>Other Address: </strong>{" "}
              <input
                class="form-control"
                placeholder="other address"
                value={newOA || ""}
                onChange={this.handleOAChange}
              />
            </p>
            <p>
              <strong>Cell Phone: </strong>

              <ReactPhoneInput
                placeholder="Enter phone number"
                defaultCountry={"ca"}
                value={newCP || ""}
                onChange={this.handlePhoneChange}
              />
            </p>

            <p>
              <strong>Home Phone: </strong>

              <ReactPhoneInput
                placeholder="Enter phone number"
                defaultCountry={"ca"}
                value={newHP || ""}
                onChange={this.handleHPChange}
              />
            </p>

            <p>
              <p>
                <strong>Email:</strong>{" "}
                <input
                  class="form-control"
                  value={newEmail || ""}
                  onChange={this.handleEChange}
                />
                <span className="error">{this.state.errors["email"]}</span>
              </p>
              <ButtonToolbar>
                <Button variant="outline-primary" onClick={this.onCheck}>
                  Save
                </Button>
                <Button variant="outline-primary" onClick={this.editCancel}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default EditContact;
