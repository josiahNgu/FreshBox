import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
class Account extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  logout = () => {
    localStorage.removeItem("idToken");
  };
  render() {
    let userData = <Spinner />;
    if (this.props.user) {
      userData = (
        <React.Fragment>
          <h1>userName: {this.props.user.displayName}</h1>
          <h1>email:{this.props.user.email}</h1>
        </React.Fragment>
      );
    }
    return (
      <div>
        {userData} <br />
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserData: () => dispatch(actions.getAuthenticatedUserData())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
