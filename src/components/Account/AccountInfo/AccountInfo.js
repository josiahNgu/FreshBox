import React from "react";
import "./AccountInfo.css";
const AccountInfo = props => {
  return (
    <aside>
      <h3>Your information</h3>
      <hr className="horizontal_line" />
      <h4>Full Name</h4>
      <p>{props.userInfo.userName}</p>
      <h4>Email</h4>
      <p>{props.userInfo.email}</p>
    </aside>
  );
};
export default AccountInfo;
