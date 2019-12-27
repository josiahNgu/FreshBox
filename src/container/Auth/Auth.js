import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Alert from "../../components/UI/Alert/Alert";
import "./Auth.css";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import backgroundImage from "../../misc/login_background.jpg";
import firebase from "firebase/app";
import "firebase/auth";
import { Redirect } from "react-router-dom";
import {
  GoogleProvider,
  FacebookProvider
} from "../../components/Firebase/index";
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
    shouldRedirect: false,
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
  authWithFacebook = () => {
    console.log("auth With Facebook");
    firebase
      .auth()
      .signInWithPopup(FacebookProvider)
      .then(result => {
        console.log(result);
        this.setState({ shouldRedirect: true });
        this.props.thirdPartyLogin(result);
      })
      .catch(err => {
        console.log(err);
      });
  };
  authWithGoogle = () => {
    console.log("auth With Facebook");
    firebase
      .auth()
      .signInWithPopup(GoogleProvider)
      .then(result => {
        console.log(result);
        this.setState({ shouldRedirect: true });
        this.props.thirdPartyLogin(result);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    if (
      this.state.shouldRedirect === true ||
      this.props.shouldRedirect === true
    ) {
      return <Redirect to="/products" />;
    }
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
          <button className="FacebookButton" onClick={this.authWithFacebook}>
            Login with Facebook
          </button>
          <br />
          <button className="GoogleButton" onClick={this.authWithGoogle}>
            Sign in with Google
          </button>
          <div>
            Don't have an account?
            <p onClick={this.changetoSignupPageHandler}>Sign up here</p>
          </div>
        </div>
        <div className="loginBackground"></div>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {
    hasError: state.auth.hasError,
    shouldRedirect: state.auth.shouldRedirect
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(actions.login(email, password)),
    thirdPartyLogin: user => dispatch(actions.loginSuccess(user))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auth)
);
