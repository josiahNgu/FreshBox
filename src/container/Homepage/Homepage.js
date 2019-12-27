import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
class Homepage extends Component {
  render() {
    return (
      <main id="homepage-main">
        <div class="homepage-content">
          <h3>Cardbox</h3>
          <p>Repetition Made Easy! Never runs out of household supply again</p>
          <div class="shop_link">
            <Link to="/products">Shop Now</Link>
          </div>
        </div>
      </main>
    );
  }
}

export default Homepage;
