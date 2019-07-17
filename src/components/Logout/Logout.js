import React, { Component } from "react";
export default class Logout extends Component {
  componentWillMount() {
    firebase
      .auth()
      .signOut()
      .then(user => {
        console.log(user);
      });
  }
  render() {
    return <Redirect to="/" />;
  }
}
