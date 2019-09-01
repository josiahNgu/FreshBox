import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import ShoppingCartIcon from "../../UI/ShoppingCartIcon/ShoppingCartIcon";

import "./NavigationItems.css";
const navigationItems = props => {
  let navigationLinks = (
    <React.Fragment>
      <NavigationItem link="/products">Products</NavigationItem>
      <NavigationItem link="/shoppingCart">
        <ShoppingCartIcon />
      </NavigationItem>
      <NavigationItem link="/auth">Login</NavigationItem>
      <NavigationItem link="/signup">Sign Up</NavigationItem>
    </React.Fragment>
  );
  if (props.isAuthenticated) {
    navigationLinks = (
      <React.Fragment>
        <NavigationItem link="/products">Products</NavigationItem>
        <NavigationItem link="/shoppingCart">Cart</NavigationItem>
        <NavigationItem link="/account">My Account</NavigationItem>
      </React.Fragment>
    );
  }
  return <ul className="NavigationItems">{navigationLinks}</ul>;
};

export default navigationItems;
