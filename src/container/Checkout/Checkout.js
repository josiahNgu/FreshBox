import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import * as actions from "../../store/actions/index";
import "./Checkout.scss";
class Checkout extends Component {
  state = {
    deliveryOptions: {
      economy: {
        price: "$7.00"
      },
      standard: {
        price: "$3.00"
      }
    },
    shippingDetails: {
      shippingName: {
        label: "Full Name",
        elementType: "input",
        elementConfig: {
          placeholder: "John Turing",
          type: "text"
        },
        value: ""
      },
      street: {
        label: "Street",
        elementType: "input",
        elementConfig: {
          placeholder: "O st",
          type: "text"
        },
        value: ""
      },
      city: {
        label: "City",
        elementType: "input",
        elementConfig: {
          placeholder: "Lincoln",
          type: "text"
        },
        value: ""
      },
      state: {
        label: "State",
        elementType: "input",
        elementConfig: {
          placeholder: "Nebraska",
          type: "text"
        },
        value: ""
      },
      zip: {
        label: "Zip",
        elementType: "input",
        elementConfig: {
          placeholder: "68503",
          type: "number"
        },
        value: ""
      }
    },
    error: {}
  };
  inputChangedHandler = (event, elementName) => {
    const updatedField = {
      ...this.state.shippingDetails,
      [elementName]: {
        ...this.state.shippingDetails[elementName],
        value: event.target.value
      }
    };
    this.setState({ shippingDetails: updatedField });
  };
  submitHandler = event => {
    event.preventDefault();
  };
  submitShippingForm = () => {
    const shippingForm = {
      fullName: this.state.shippingDetails.shippingName.value,
      street: this.state.shippingDetails.street.value,
      city: this.state.shippingDetails.city.value,
      state: this.state.shippingDetails.state.value,
      zip: this.state.shippingDetails.zip.value
    };
    console.log("shippingForm :", shippingForm);
    this.props.shippingAddress(shippingForm);
    this.routePaymentPage();
  };
  routePaymentPage = () => {
    const path = "/payment";
    this.props.history.push(path);
  };

  shippingInputGenerator = value => {
    return (
      <Input
        elementTypes={this.state.shippingDetails[value].elementType}
        elementConfig={this.state.shippingDetails[value].elementConfig}
        value={this.state.shippingDetails[value].value}
        changed={event => this.inputChangedHandler(event, value)}
      />
    );
  };
  render() {
    return (
      <main className="Checkout pt_4 container-fluid ">
        <div className="row">
          <div className="col-md-12 col-lg-6 shopping-list ">
            <ShoppingList />
          </div>
          <div className="col-md-12 col-lg-6 background  checkout-form">
            <div className="shipping-form">
              <h5>SHIPPING ADDRESS</h5>
              <label>Full Name</label>
              {this.shippingInputGenerator("shippingName")}
              <label>Street</label>
              {this.shippingInputGenerator("street")}
              <label>City</label>
              {this.shippingInputGenerator("city")}
              <label>State</label>
              {this.shippingInputGenerator("state")}
              <label>Zip</label>
              {this.shippingInputGenerator("zip")}
            </div>
            <button className="next-btn" onClick={this.submitShippingForm}>
              Next
            </button>
          </div>
        </div>
      </main>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    shippingAddress: shippingInfo =>
      dispatch(actions.shippingAddressForm(shippingInfo))
  };
};
export default connect(null, mapDispatchToProps)(Checkout);
