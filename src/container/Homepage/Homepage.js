import React, { Component } from "react";
import "./Homepage.scss";
class Homepage extends Component {
  navigateToPage = () => {
    this.props.history.push("products");
  };
  render() {
    return (
      <main id="homepage-main">
        <div className="homepage-container">
          <div className="homepage-content">
            <h3>Eat Fresh & Healthy</h3>
            <h3>Feel Good, Never Stress</h3>
            <p className="description">
              Crunchy fresh fruits and vegetables directly from local farmers
            </p>
            <button className="shop-link" onClick={this.navigateToPage}>
              Shop Now
            </button>
            {/* <h4>Top Picks</h4> */}
          </div>
        </div>
      </main>
    );
  }
}

export default Homepage;
