import React from "react";
import "./Alert.css";
const alert = props => {
  return <div className="Alert">{props.message}</div>;
};
export default alert;
