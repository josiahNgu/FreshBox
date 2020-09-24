import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import Input from "../../components/UI/Input/Input";
import "./Payment.css";
class Payment extends React.Component {
  componentDidMount() {
    console.log("this.props.shippingStatus :", this.props.shippingStatus);
    if (this.props.shippingStatus === 0) {
      console.log("here");
      const path = "/checkout";
      this.props.history.push(path);
    }
  }

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
        elementType: "input",
        elementConfig: {
          placeholder: "Turing Lee",
          type: "text"
        },
        value: ""
      },
      expDate: {
        label: "Good Thru",
        elementType: "cardInputDate",
        elementConfig: {
          placeholder: "01/2022",
          type: "month"
        },
        value: ""
      },
      cvc: {
        label: "CVC",
        elementType: "input",
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
  submitCardForm = () => {
    const cardForm = {
      cardNumber: this.state.cardElements.cardNumber.value,
      nameOnCard: this.state.cardElements.nameOnCard.value,
      cvc: this.state.cardElements.cvc.value,
      expDate: this.state.cardElements.expDate.value
    };
    const updatedShoppingList = this.filterShoppingCartList();
    this.props.placeOrder(
      updatedShoppingList,
      this.props.shippingForm,
      cardForm
    );
  };
  routeToCheckout = () => {
    this.props.history.push("/checkout");
  };

  filterShoppingCartList = () => {
    const shoppingList = [];
    this.props.userOrder.forEach(item => {
      shoppingList.push({
        itemId: item.itemId,
        quantity: item.quantity
      });
    });
    return shoppingList;
  };
  render() {
    return (
      <main className="Payment pt_4 container-fluid ">
        <div className="row">
          <div className="col-md-6 shoppingList">
            <button onClick={this.routeToCheckout} className="back_btn">
              &laquo; Back
            </button>
            <ShoppingList />
          </div>
          <div className=" gradient_background text-center  col-md-6">
            <section className="card_section">
              <h5>CREDIT/DEBIT CARD PAYMENT</h5>
              <div className="">
                <div className="row">
                  <div className="col-sm-12">
                    <label>Card Number</label>
                    {this.cardInputGenerator("cardNumber")}
                  </div>
                  <div className="col-sm-12">
                    <label>Full Name</label>
                    {this.cardInputGenerator("nameOnCard")}
                  </div>
                  <div className="col-sm-12">
                    <label>Good Thru</label>
                    {this.cardInputGenerator("expDate")}
                  </div>
                  <div className="col-sm-12">
                    <label>CVC</label>
                    {this.cardInputGenerator("cvc")}
                  </div>
                </div>
              </div>
              <button
                className="secondary_button"
                onClick={this.submitCardForm}
              >
                Place Order
              </button>
            </section>
          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    shippingStatus: state.payment.shippingInfoCompleted,
    shippingForm: state.payment.shippingInfo,
    userOrder: state.shoppingCart.shoppingList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    placeOrder: (userOrder, shippingForm, cardForm) =>
      dispatch(actions.placeOrder(userOrder, shippingForm, cardForm))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
