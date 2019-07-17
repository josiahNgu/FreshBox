import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import { connect } from "react-redux";
class Account extends Component {
  logout = () => {
    return firebase.auth().signOut();
  };

  render() {
    return (
      <div>
        username: {this.props.user.displayName} <br />
        email: {this.props.user.email}
        phone number: {this.props.user.phoneNumber}
        <br />
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProps)(Account);
