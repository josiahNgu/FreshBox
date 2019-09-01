import React, { Component } from "react";
import Select from "../../components/UI/Select/Select";
import Spinner from "../../components/UI/Spinner/Spinner";
import ShoppingCartIcon from "../../components/UI/ShoppingCartIcon/ShoppingCartIcon";
class Homepage extends Component {
  render() {
    return (
      <div>
        <Select />
        <Spinner />
        <ShoppingCartIcon />
      </div>
    );
  }
}

export default Homepage;
