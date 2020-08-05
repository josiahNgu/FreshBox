import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Alert from "../../components/UI/Alert/Alert";
import "./Auth.css";
import * as actions from "../../store/actions/index";
import { withRouter, Router } from "react-router-dom";
import { connect } from "react-redux";

class Auth extends Component {
  state = {
    formElements: {
      email: {
        elementType: "input",
        elementConfig: {
          placeholder: "Email",
          type: "email"
        },
        value: ""
      },
      password: {
        elementType: "input",
        elementConfig: {
          placeholder: "Password",
          type: "password"
        },
        value: ""
      }
    },
    error: {}
  };

  changetoSignupPageHandler = event => {
    event.preventDefault();
    console.log("here");
    this.props.history.push("/signup");
  };
  inputChangedHandler = (event, elementName) => {
    const updatedField = {
      ...this.state.formElements,
      [elementName]: {
        ...this.state.formElements[elementName],
        value: event.target.value
      }
    };
    this.setState({ formElements: updatedField });
  };
  submitHandler = event => {
    event.preventDefault();
    this.props.login(
      this.state.formElements["email"].value,
      this.state.formElements["password"].value
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.formElements) {
      formElementsArray.push({ id: key, config: this.state.formElements[key] });
    }
    let form = (
      <form onSubmit={this.submitHandler}>
        <h5 className="Header">Sign In to Account</h5>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementTypes={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <button className="signIn_button">Sign In</button>
      </form>
    );
    if (this.props.loginSuccess) {
      Router.push("/account");
    }
    return (
      <section id="Auth">
        <div className="AuthForm">
          <div className={this.props.hasError ? "login_block" : "login_hidden"}>
            <Alert
              message={
                this.props.hasError ? "Incorrect username or password" : null
              }
            />
          </div>
          {form}
          <hr />

          <div>
            Don't have an account?
            <p onClick={this.changetoSignupPageHandler}>Sign up here</p>
          </div>
        </div>
        <div className="loginBackground DesktopOnly"></div>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {
    hasError: state.auth.hasError,
    loginSuccess: state.auth.loginSuccess
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(actions.login(email, password))
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
