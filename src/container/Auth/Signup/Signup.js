import React, { Component } from "react";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import "./Signup.css";
class Signup extends Component {
  state = {
    formElements: {
      name: {
        elementType: "input",
        elementConfig: {
          placeholder: "What should we call you?",
          type: "name"
        },
        value: ""
      },
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
          placeholder: "Password(min. 6 characters)",
          type: "password"
        },
        value: ""
      },
      confirmPassword: {
        elementType: "input",
        elementConfig: {
          placeholder: "Confirm Password",
          type: "password"
        },
        value: ""
      }
    }
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
    this.props.onSignupHandler(
      this.state.formElements["email"].value,
      this.state.formElements["confirmPassword"].value,
      this.state.formElements["name"].value
    );
  };
  render() {
    if (this.props.shouldRedirect) {
      this.props.history.push("/products");
    }
    let form = <Spinner />;
    const formElementsArray = [];
    for (let key in this.state.formElements) {
      formElementsArray.push({ id: key, config: this.state.formElements[key] });
    }
    form = (
      <form onSubmit={this.submitHandler}>
        <h5 className="Header">Sign Up</h5>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementTypes={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <button className="SubmitButton">Submit</button>
      </form>
    );

    // const ui = new firebaseui.auth.AuthUI(firebase.auth());

    // ui.start("#firebaseui-auth-container", uiConfig);
    return (
      <div className="Signup">
        <p>{this.props.errorMessage}</p>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    shouldRedirect: state.auth.shouldRedirect,
    errorMessage: state.auth.signupError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSignupHandler: (email, password, userName) =>
      dispatch(actions.signup(email, password, userName))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
