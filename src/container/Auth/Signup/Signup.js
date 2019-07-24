import React, { Component } from "react";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import Alert from "../../../components/UI/Alert/Alert";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { checkValidity } from "../../../store/utility";
import "./Signup.css";
class Signup extends Component {
  state = {
    errorMessage: "",
    formElements: {
      name: {
        elementType: "input",
        elementConfig: {
          placeholder: "What should we call you?",
          type: "name"
        },
        value: "",
        valid: false,
        validation: {
          required: true,
          minLength: 3
        },
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          placeholder: "Email",
          type: "email"
        },
        value: "",
        valid: false,
        validation: {
          required: true,
          isEmail: true
        }
      },
      password: {
        elementType: "input",
        elementConfig: {
          placeholder: "Password(min. 6 characters)",
          type: "password"
        },
        value: "",
        valid: false,
        validation: {
          required: true,
          isPassword: true
        },
        touched: false
      },
      confirmPassword: {
        elementType: "input",
        elementConfig: {
          placeholder: "Confirm Password",
          type: "password"
        },
        value: ""
      }
    },
    showAlert: false
  };
  matchPassword = (confirmPassword, password) => {
    if (confirmPassword === password) {
      return true;
    }
    return false;
  };
  allFieldValid = () => {
    for (let key in this.state.formElements) {
      if (!this.state.formElements[key].valid) {
        return false;
      }
    }
    return true;
  };
  inputChangedHandler = (event, elementName) => {
    const updatedField = {
      ...this.state.formElements,
      [elementName]: {
        ...this.state.formElements[elementName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.formElements[elementName].validation
        ),
        touched: true
      }
    };

    this.setState({ formElements: updatedField });
  };
  submitHandler = event => {
    event.preventDefault();
    if (!this.allFieldValid()) {
      this.setState({
        showAlert: true,
        errorMessage:
          "Please make sure that every field is filled and fix fields with error"
      });
    } else if (
      this.matchPassword(
        this.state.formElements.confirmPassword.value,
        this.state.formElements.password.value
      ) &&
      this.allFieldValid()
    ) {
      this.setState({ errorMessage: "", showAlert: false });
      this.props.onSignupHandler(
        this.state.formElements["email"].value,
        this.state.formElements["confirmPassword"].value,
        this.state.formElements["name"].value
      );
    } else {
      this.setState({
        errorMessage: "Passwords should match",
        showAlert: true
      });
    }
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
            currentElement={formElement.id}
            elementTypes={formElement.config.elementType}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            errorMwssage={formElement.config.errorMessage}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <button className="SubmitButton">Submit</button>
      </form>
    );
    return (
      <div className="container col-sm-10 Signup">
        <div className={this.state.showAlert ? "Block" : "Hidden"}>
          <Alert message={this.state.errorMessage} />
        </div>
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
