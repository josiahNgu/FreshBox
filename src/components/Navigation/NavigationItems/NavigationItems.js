import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import ShoppingCartIcon from "../../UI/ShoppingCartIcon/ShoppingCartIcon";

import "./NavigationItems.css";
const navigationItems = props => {
  let navigationLinks = (
    <ul>
      <NavigationItem link="/products">PRODUCTS</NavigationItem>
      <NavigationItem link="/shoppingCart">
        CART
        {/* <img src="https://img.icons8.com/cotton/64/000000/fast-cart.png"></img> */}
      </NavigationItem>
      <NavigationItem link="/auth">LOGIN</NavigationItem>
      <NavigationItem link="/signup">JOIN</NavigationItem>
    </ul>
  );
  if (props.isAuthenticated) {
    navigationLinks = (
      <ul>
        {/* <li>
          <NavigationItem link="/">CardBox</NavigationItem>
        </li> */}
        <NavigationItem link="/products">Products</NavigationItem>
        <NavigationItem link="/shoppingCart">CART</NavigationItem>
        <NavigationItem link="/account">Account</NavigationItem>
      </ul>
    );
  }
  return (
    <nav id="NavigationItems">
      <h3>
        <a href="/">CardBox</a>
      </h3>
      {navigationLinks}
    </nav>
  );
};

export default navigationItems;
