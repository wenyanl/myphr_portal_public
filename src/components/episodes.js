import React, { Component, Fragment } from "react";
import "../App.css";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Scroll from "react-scroll";
import { userService } from "../service";

var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;

/**
 * Episdoes page
 */
class Episodes extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "home",
      episodes: [],
      isLoading: true
    };
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("oneUser")),
      basicInfo: JSON.parse(localStorage.getItem("basicInfo"))
    });

    userService
      .getEpisodes(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1
      )
      .then(data =>
        this.setState({
          episodes: data.sort(this.comp),
          isLoading: false
        })
      );

    Events.scrollEvent.register("begin", function() {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function() {
      console.log("end", arguments);
    });

    scrollSpy.update();
  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  //convert date to "Month Year"
  convert(str) {
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2);
    return [date.getFullYear(), month].join("-");
  }

  convertFull(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  //sort JSON array by date
  comp(b, a) {
    return new Date(a.start_date).getTime() - new Date(b.end_date).getTime();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  render() {
    const { episodes, isLoading } = this.state;

    if (isLoading) {
      return <div>is loading...</div>;
    } else {
      return (
        <div class="episodes">
          <Fragment className="timeline-space">
            <Element
              name="test7"
              className="element"
              id="containerElement"
              style={{
                position: "relative",
                height: "600px",
                overflow: "scroll",
                marginBottom: "100px",
                border: "0.01px solid grey"
              }}
            >
              {episodes.map(item => (
                <div>
                  <VerticalTimeline>
                    <VerticalTimelineElement
                      className="vertical-timeline-element--work"
                      date={this.convert(item.start_date)}
                      iconStyle={{
                        background: "rgb(33, 150, 243)",
                        color: "#fff"
                      }}
                      position={"left"}
                    >
                      <h5 className="vertical-timeline-element-title">
                        {item.Healthcare_provider_name}
                      </h5>
                      <ul>
                        <div>
                          {item.is_active ? (
                            <div>
                              <li>{this.convertFull(item.start_date)}</li>
                            </div>
                          ) : (
                            <div>
                              <li>
                                {this.convertFull(item.start_date)} to{" "}
                                {this.convertFull(item.end_date)}
                              </li>
                            </div>
                          )}
                        </div>

                        <li>{item.reason}</li>
                        <li>Dr.{item.physician_name}</li>
                      </ul>
                    </VerticalTimelineElement>
                  </VerticalTimeline>
                </div>
              ))}
            </Element>
          </Fragment>
        </div>
      );
    }
  }
}
export default Episodes;