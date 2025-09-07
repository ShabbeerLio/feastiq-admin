import React, { useEffect, useState } from "react";
import "./Sidenav.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";

const Sidenav = () => {
  let history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history("/login");
  };

  return (
    <div className="Sidenav">
      <div className="Sidenav-icon">
        <Link to={"/"}>
          <img src={logo} alt="" />
          <p>FeastIQ</p>
        </Link>
      </div>
      <div className="Sidenav-box">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/coupon"}>Coupons</Link>
          </li>
          <li>
            <Link to={"/plans"}>Plans</Link>
          </li>
          <li>
            <Link to={"/users"}>Users</Link>
          </li>
          <li>
            <Link to={"/subscription"}>Subscription</Link>
          </li>
          {/* <li>
            <Link to={"/remedy"}>Notifications</Link>
          </li> */}
          <li>
            <Link to={"/delete-request"}>Delete Request</Link>
          </li>
        </ul>
      </div>
      <div className="Sidenav-logout">
        <Link to={"/login"} onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidenav;
