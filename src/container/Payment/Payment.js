import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-solid-svg-icons";
import "./Payment.css";
import CartSummary from "../../components/CartSummary/CartSummary";
import Input from "../../components/UI/Input/Input";
class Payment extends React.Component {
  state = {
    cardElements: {
      cardNumber: {
        label: "Credit Card No.",
        elementType: "cardInput",
        elementConfig: {
          placeholder: "0000 - 0000 - 0000 - 0000",
          type: "number"
        },
        value: ""
      },
      nameOnCard: {
        label: "Full Name",
        elementType: "cardInput",
        elementConfig: {
          placeholder: "Turing Lee",
          type: "text"
        },
        value: ""
      },
      expDate: {
        label: "Good Thru",
        elementType: "cardInputRow",
        elementConfig: {
          placeholder: "01/2022",
          type: "text"
        },
        value: ""
      },
      cvc: {
        label: "CVC",
        elementType: "cardInputRow",
        elementConfig: {
          placeholder: "XXX",
          type: "password"
        },
        value: ""
      }
    }
  };
  inputChangedHandler = (event, elementName) => {
    const updatedField = {
      ...this.state.cardElements,
      [elementName]: {
        ...this.state.cardElements[elementName],
        value: event.target.value
      }
    };
    this.setState({ cardElements: updatedField });
  };
  cardInputGenerator = value => {
    return (
      <Input
        elementTypes={this.state.cardElements[value].elementType}
        elementConfig={this.state.cardElements[value].elementConfig}
        value={this.state.cardElements[value].value}
        changed={event => this.inputChangedHandler(event, value)}
      />
    );
  };
  render() {
    return (
      <div className="Payment">
        <div className="PromptPayment">
          <h5> PROMPT PAYMENT</h5>
          <p>
            Pay using your Paypal account. You will be redirected to their
            system to complete the payment
          </p>
          <button className="SubmitButton" onClick={this.props.initPaypal}>
            Paypal
          </button>
        </div>
        <div className="CardSection">
          <h5>CREDIT/DEBIT CARD PAYMENT</h5>
          <div className="Card">
            <FontAwesomeIcon icon={faCreditCard} />
            <div className="row">
              <div className="col-sm-12">
                <label>Card Number</label>
                {this.cardInputGenerator("cardNumber")}
              </div>
              <div className="col-sm-12">
                <label>Full Name</label>
                {this.cardInputGenerator("nameOnCard")}
              </div>
              <div className="col-sm-6">
                <label>Good Thru</label>
                {this.cardInputGenerator("expDate")}
              </div>
              <div className="col-sm-6">
                <label>CVC</label>
                {this.cardInputGenerator("cvc")}
              </div>
            </div>
          </div>
        </div>
        <p>
          By clicking PAY NOW SECURELY you agree to our Terms and Conditions
        </p>
        <CartSummary buttonText="PAY NOW SECURELY" />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    initPaypal: () => dispatch(actions.initPaypal())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Payment);
