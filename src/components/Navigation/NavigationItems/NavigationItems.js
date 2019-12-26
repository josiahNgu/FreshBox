import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import ShoppingCartIcon from "../../UI/ShoppingCartIcon/ShoppingCartIcon";

import "./NavigationItems.css";
const navigationItems = props => {
  let navigationLinks = (
    <React.Fragment>
      <NavigationItem link="/products">PRODUCTS</NavigationItem>
      <NavigationItem link="/shoppingCart">
        <ShoppingCartIcon />
      </NavigationItem>
      <NavigationItem link="/auth">LOGIN</NavigationItem>
      <NavigationItem link="/signup">JOIN</NavigationItem>
    </React.Fragment>
  );
  if (props.isAuthenticated) {
    navigationLinks = (
      <React.Fragment>
        <NavigationItem link="/products">PRODUCTS</NavigationItem>
        <NavigationItem link="/shoppingCart">Cart</NavigationItem>
        <NavigationItem link="/account">My Account</NavigationItem>
      </React.Fragment>
    );
  }
  return (
    <ul className="NavigationItems">
      <li>{navigationLinks}</li>
    </ul>
  );
};

export default navigationItems;
