import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
class Homepage extends Component {
  render() {
    return (
      <main id="homepage-main">
        <div className="homepage-content">
          <h1>FreshBox</h1>
          <p>Fresh fruits and vegetables directly from local farmers</p>
          <div className="shop_link">
            <Link to="/products">Shop Now</Link>
          </div>
        </div>
      </main>
    );
  }
}

export default Homepage;
