import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";
class navigationItems extends React.Component {
  render() {
    let navigationLinks = (
      <React.Fragment>
        <NavigationItem link="/products">Products</NavigationItem>
        <NavigationItem link="/auth">Login</NavigationItem>
        <NavigationItem link="/signup">Sign Up</NavigationItem>
      </React.Fragment>
    );
    if (this.props.isAuthenticated) {
      navigationLinks = (
        <React.Fragment>
          <NavigationItem link="/products">Products</NavigationItem>
          <NavigationItem link="/shoppingCart">Cart</NavigationItem>
          <NavigationItem link="/account">My Account</NavigationItem>
        </React.Fragment>
      );
    }
    return <ul className="NavigationItems">{navigationLinks}</ul>;
  }
}

export default navigationItems;
