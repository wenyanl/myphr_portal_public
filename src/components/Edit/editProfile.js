import React, { Component } from "react";
import "../../App.css";
import { userService } from "../../service";
import { ButtonToolbar, Button } from "react-bootstrap";
import Select from "react-select";

const optionsDiet = [
  "vegan",
  "Atkins",
  "Zone",
  "Ketogenic",
  "Weight Watchers",
  "South Beach",
  "Raw food",
  "Healthy",
  "Vegetarian"
];
const optionsAD = ["DNR", " Living Will"];
/**
 * Profile Health Profile subpage
 * patients are allowed to add Dietary Regimen and Advance Directives options
 */

/**
 * Needs a refresh after save!!!!
 */
class EditProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    const clientToEdit = JSON.parse(localStorage.getItem("healthProfile"));
    this.state = {
      isLoading: true,
      isEditProfile: false,
      healthProfile: clientToEdit,
      newDiet: "",
      newAdvanceDirective: "",
      blankDiet: { label: "", value: "" },
      allDiets: [],
      blankAd: { label: "", value: "" },
      allADs: []
    };
    this.editCancel = this.editCancel.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeAD = this.handleChangeAD.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const result = this.state.healthProfile.filter(
      word => word.type == "Dietary Regimen"
    );
    var t = [];
    for (let i = 0; i < result.length; i++) {
      t.push(result[i].name);
    }
    this.setState({ allDiets: t });

    const result2 = this.state.healthProfile.filter(
      word => word.type == "Advance Directive"
    );
    var t2 = [];
    for (let i = 0; i < result2.length; i++) {
      t2.push(result2[i].name);
    }
    this.setState({ allADs: t2 });
  }

  editCancel() {
    this.setState({
      isEditProfile: false
    });
  }
  editProfile() {
    this.setState({
      isEditProfile: true
    });
  }

  handleChange = newDiet => {
    //if newDiet == any one of values in this.state.test, newDiet =""; else newDiet: newDiet
    function checkAvailability(arr, val) {
      return arr.some(function(arrVal) {
        return val === arrVal;
      });
    }
    checkAvailability(this.state.allDiets, newDiet.value);
    if (checkAvailability(this.state.allDiets, newDiet.value)) {
      this.setState({ newDiet: this.state.blankDiet });
    } else {
      this.setState({ newDiet: newDiet });
    }

    //console.log(`result:`, this.state.newDiet.value);
  };
  handleChangeAD = newAdvanceDirective => {
    function checkAvailability(arr, val) {
      return arr.some(function(arrVal) {
        return val === arrVal;
      });
    }
    checkAvailability(this.state.allADs, newAdvanceDirective.value);
    if (checkAvailability(this.state.allADs, newAdvanceDirective.value)) {
      this.setState({ newAdvanceDirective: this.state.blankAd });
    } else {
      this.setState({ newAdvanceDirective: newAdvanceDirective });
    }
  };
  TOKEN = JSON.parse(localStorage.getItem("oneUser")).token;
  ID = JSON.parse(localStorage.getItem("oneUser")).client_id;

  appendObjTo(thatArray, newObj) {
    const frozenObj = Object.freeze(newObj);
    return Object.freeze(thatArray.concat(frozenObj));
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.newDiet.value != null && this.state.newDiet.value != "") {
      userService.addDiet(this.ID, this.TOKEN, this.state.newDiet.value);
      this.setState({
        allDiets: this.appendObjTo(
          this.state.allDiets,
          this.state.newDiet.value
        )
      });
    }

    if (
      this.state.newAdvanceDirective.value != null &&
      this.state.newAdvanceDirective.value != ""
    ) {
      userService.addAdvanceDirective(
        this.ID,
        this.TOKEN,
        this.state.newAdvanceDirective.value
      );
      this.setState({
        allADs: this.appendObjTo(
          this.state.allADs,
          this.state.newAdvanceDirective.value
        )
      });
    }
    this.setState({ isEditProfile: false });
  }
  render() {
    const {
      healthProfile,
      isEditProfile,
      newDiet,
      newAdvanceDirective,
      allDiets,
      allADs
    } = this.state;
    const diets = optionsDiet.map(diet => ({
      label: diet,
      value: diet
    }));
    const ads = optionsAD.map(ad => ({
      label: ad,
      value: ad
    }));

    console.log("all diets:" + allDiets);
    return (
      <div>
        {!isEditProfile ? (
          <div>
            <p>
              <strong>Dietary Regimen: </strong>
              {allDiets
                .map(t => <span>{t}</span>)
                .reduce((accu, elem) => {
                  return accu === null ? [elem] : [...accu, ",", elem];
                }, null)}
            </p>
            <p>
              {" "}
              <strong>Advance Directives: </strong>{" "}
              {allADs
                .map(t => <span>{t}</span>)
                .reduce((accu, elem) => {
                  return accu === null ? [elem] : [...accu, ",", elem];
                }, null)}
            </p>
            <p>
              <strong>Active Diagnosis: </strong>
            </p>
            <div>
              {healthProfile.diagnosing_healthcare_provider_id == "" ? (
                <div />
              ) : (
                <div>
                  <ul>
                    >>
                    <li> diagnosed on: </li>
                    <li> diagnosed by: </li>
                  </ul>
                </div>
              )}
            </div>
            <p>
              <strong>Allergies: </strong>
            </p>
            <div>
              {healthProfile.is_allergy ? (
                <div>
                  <li> </li>
                </div>
              ) : (
                <div />
              )}
            </div>
            <p>
              <strong>Risk and Safety Codes: </strong>
            </p>
            <div>
              {healthProfile.map(h => (
                <div>
                  {h.type == "Health Risk" ? (
                    <div>
                      {" "}
                      <ul>>> {h.name}</ul>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              ))}
            </div>
            <Button variant="outline-primary" onClick={this.editProfile}>
              Edit
            </Button>
          </div>
        ) : (
          <div>
            <p>
              {" "}
              <div class="inline">
                <strong>Dietary Regimen: </strong>{" "}
                {allDiets
                  .map(t => <span>{t}</span>)
                  .reduce((accu, elem) => {
                    return accu === null ? [elem] : [...accu, ",", elem];
                  }, null)}
              </div>
              <div style={{ width: "200px" }}>
                <Select
                  options={diets}
                  value={newDiet}
                  autosize={true}
                  onChange={this.handleChange}
                  placeholder="Add..."
                />
              </div>
            </p>
            <p>
              {" "}
              <strong>Advance Directives: </strong>{" "}
              {allADs
                .map(t => <span>{t}</span>)
                .reduce((accu, elem) => {
                  return accu === null ? [elem] : [...accu, ",", elem];
                }, null)}
              <div style={{ width: "200px" }}>
                <Select
                  options={ads}
                  value={newAdvanceDirective}
                  autosize={true}
                  onChange={this.handleChangeAD}
                  placeholder="Add..."
                />
              </div>
            </p>
            <p>
              <strong>Active Diagnosis: </strong>
            </p>
            <div>
              {healthProfile.diagnosing_healthcare_provider_id == "" ? (
                <div />
              ) : (
                <div>
                  <ul>
                    <li> >></li>
                    <li> diagnosed on: </li>
                    <li> diagnosed by: </li>
                  </ul>
                </div>
              )}
            </div>
            <p>
              <strong>Allergies: </strong>
            </p>
            <div>
              {healthProfile.is_allergy ? (
                <div>
                  <li> </li>
                </div>
              ) : (
                <div />
              )}
            </div>
            <p>
              <strong>Risk and Safety Codes: </strong>
            </p>
            <div>
              {healthProfile.map(h => (
                <div>
                  {h.type == "Health Risk" ? (
                    <div>
                      <ul>>> {h.name}</ul>{" "}
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              ))}
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

export default EditProfile;