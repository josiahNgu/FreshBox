import React, { Component } from "react";
import AccountSideBar from "../../components/Account/AccountSideBar/AccountSideBar";
import "./Order.css";
class Order extends Component {
    render() {
        return (
            <div className="pt_4 order_container">
                <h1>Your Orders</h1>
                <aside className="sidebar ">
                    <AccountSideBar />
                </aside>
                <aside className="main_info"></aside>
            </div>
        );
    }
}

export default Order;
