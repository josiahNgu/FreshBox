import React from "react";
import "./Alert.css";
const alert = props => {
  return (
    <div
      className={
        props.type === "success"
          ? "alert_success text_center"
          : "alert_fail text_center"
      }
    >
      {props.message}
    </div>
  );
};
export default alert;
