import React, { Component } from "react";
import { connect } from "react-redux";
import AccountSideBar from "../../components/Account/AccountSideBar/AccountSideBar";
import AccountInfo from "../../components/Account/AccountInfo/AccountInfo";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import "./Account.css";
class Account extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  logout = () => {
    localStorage.removeItem("idToken");
    window.location.reload();
  };
  render() {
    let userData = <Spinner />;
    if (this.props.user) {
      userData = {
        userName: this.props.user.data.userData.displayName,
        email: this.props.user.data.userData.email,
      };
    }
    return (
      <div className="account">
        <h2>My Account</h2>
        <AccountSideBar />
        <AccountInfo userInfo={userData} /> <br />
        <button className="PrimaryButton" onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: () => dispatch(actions.getAuthenticatedUserData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
