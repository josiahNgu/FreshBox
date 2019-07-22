import "./Select.css";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

class Select extends Component {
  render() {
    return (
      <div className="selectBox">
        <input type="checkbox" id="options-view-button" />
        <div className="selectionValue">
          <div className="selected-value">
            <span>{this.props.currentSelection}</span>
          </div>
          <div id="chevrons">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>

        <div
          id="options"
          className={this.props.showOptions ? "hidden" : null}
          onClick={this.toggleOptionsHandler}
        >
          <div
            className="option"
            onClick={() => {
              this.props.selectHandler("Every Month", 1);
              this.props.toggleOptionsHandler();
            }}
          >
            <input type="radio" value="1" />
            <span className="label">Every Month</span>
          </div>
          <div
            className="option"
            onClick={() => this.props.selectHandler("Every 2 Months", 2)}
          >
            <input type="radio" value="2" />
            <span className="label">Every 2 Months</span>
          </div>
          <div
            className="option"
            onClick={() => this.props.selectHandler("Every 3 Months", 3)}
          >
            <input type="radio" value="3" />
            <span className="label">Every 3 Months</span>
          </div>
          <div
            className="option"
            onClick={() => this.props.selectHandler("Every 6 Months", 6)}
          >
            <input type="radio" value="6" />
            <span className="label">Every 6 Months</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Select;
