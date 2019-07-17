import React from "react";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  componentWillUpdate() {
    console.log("[Modal.js]- Component will update");
  }
  render() {
    return (
      <div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="Modal"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default Modal;
