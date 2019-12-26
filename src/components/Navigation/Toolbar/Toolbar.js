import React from "react";
import "./Toolbar.css";
// import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
const toolbar = props => (
  <header className="Toolbar">
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className="DesktopOnly ToolbarContainer">
      <NavigationItems isAuthenticated={props.isAuth} />
    </div>
  </header>
);
export default toolbar;
