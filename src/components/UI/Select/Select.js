import "./Select.css";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    };
  }
  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  };
  handleClickOutside = () => {
    this.setState({ listOpen: false });
  };
  render() {
    const { listOpen, headerTitle } = this.state;
    return (
      <div>
        <div className="selectionValue" onClick={this.toggleList}>
          {headerTitle}
        </div>
        {/* <div>
          {listOpen ? (
            <FontAwesomeIcon icon="faAngleUp" size="2x" />
          ) : (
            <faAngleUp name="angle-down" size="2x" />
          )}
        </div> */}
        {listOpen && (
          <ul className="dd-list">
            <div
              className="dd-list-item"
              onClick={() => this.props.toggleSelected(1)}
            >
              1
            </div>
            <li className="dd-list-item">2</li>
          </ul>
        )}
      </div>
    );
  }
}

export default Select;
