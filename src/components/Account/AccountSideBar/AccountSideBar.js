import React from "react";
import NavigationItem from "../../Navigation/NavigationItems/NavigationItem/NavigationItem";
const AccountSideBar = (props) => {
  let navigationLinks = (
    <ul>
      <NavigationItem link="/account">My Info</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  );
  return <div>{navigationLinks}</div>;
};
export default AccountSideBar;
