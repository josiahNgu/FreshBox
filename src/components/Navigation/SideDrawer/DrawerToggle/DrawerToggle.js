import React from "react";
import "./DrawerToggle.css";
const drawerToggle = props => (
  <div onClick={props.clicked} className="DrawerToggle ">
    <div className="hamburger">
      <div></div>
    </div>
    {/* <div className="col-sm-6">
      <h3 className="logo ">CardBox</h3>
    </div> */}
  </div>
);
export default drawerToggle;
