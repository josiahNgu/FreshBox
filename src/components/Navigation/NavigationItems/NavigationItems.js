import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import "./NavigationItems.css";
const navigationItems = (props) => {
  let navigationLinks = (
    <ul>
      <NavigationItem link="/products">PRODUCTS</NavigationItem>
      <NavigationItem link="/shoppingCart">CART</NavigationItem>
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
        <NavigationItem link="/products">PRODUCTS</NavigationItem>
        <NavigationItem link="/shoppingCart">CART</NavigationItem>
        <NavigationItem link="/account">ACCOUNT</NavigationItem>
      </ul>
    );
  }
  return (
    <nav id="NavigationItems">
      <h3 className="DesktopOnly">
        <a href="/">FreshBox</a>
      </h3>
      <div className="nav_links">{navigationLinks}</div>
    </nav>
  );
};

export default navigationItems;
