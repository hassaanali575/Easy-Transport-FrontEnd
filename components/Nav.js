import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logOutRequest } from "../redux/auth/auth.actions";
import navlogo from "../assets/images/navlogo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const user = useSelector(({ auth }) => auth.user);
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <nav className=" w-100 p-3 navbar navbar-expand-lg navbar-light position-fixed top-0 start-0">
      <div className="container-fluid">
        <Link href="/" passHref>
          <div className="navbarBrand fw-bold">
            <Image src={navlogo} width={200} height={50} />
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="bi bi-list"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav navItems text-center">
            <Link href="/">
              <a className="nav-link">
                <li
                  className="nav-item"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  Home
                </li>
              </a>
            </Link>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Trucks
              </a>
              <ul className="dropdown-menu bg-white text-center">
                <li>
                  <h6 className="dropdown-header">Select Truck Type</h6>
                </li>
                <Link href="/trucks/smalltrucks" passHref>
                  <li
                    className="dropdown-item"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Small Trucks
                  </li>
                </Link>
                <Link href="/trucks/heavytrucks" passHref>
                  <li
                    className="dropdown-item"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Heavy Trucks
                  </li>
                </Link>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Vehicles
              </a>
              <ul className="dropdown-menu bg-white ">
                <li>
                  <h6 className="dropdown-header">Select Vehicle Type</h6>
                </li>
                <Link href="/vehicles/cars" passHref>
                  <li
                    className="dropdown-item"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    {" "}
                    Cars
                  </li>
                </Link>
                <Link href="/vehicles/buses" passHref>
                  <li
                    className="dropdown-item"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Buses
                  </li>
                </Link>
                <Link href="/vehicles/vans" passHref>
                  <li
                    className="dropdown-item"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Vans
                  </li>
                </Link>
              </ul>
            </li>
            <Link href="/drivers">
              <a className="nav-link">
                <li
                  className="nav-item"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  Drivers
                </li>
              </a>
            </Link>

            <Link href="/aboutus">
              <a className="nav-link">
                <li
                  className="nav-item"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  About Us
                </li>
              </a>
            </Link>
            <Link href="/contactus">
              <a className="nav-link">
                <li
                  className="nav-item"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  Contact Us
                </li>
              </a>
            </Link>
          </ul>

          {!isLoggedIn ? (
            <div className="navbar-nav text-center">
              <Link href="/login">
                <a className="nav-link">
                  <button
                    type="button"
                    className="btn "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Login
                  </button>
                </a>
              </Link>
              <Link href="/signup">
                <a className="nav-link">
                  <button
                    type="button"
                    className="btn "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Sign Up
                  </button>
                </a>
              </Link>
            </div>
          ) : (
            <div className="navbar-nav text-center ">
              <Link href="/dashboard">
                <a className="nav-link">
                  <button
                    type="button"
                    className="btn "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Dashboard
                  </button>
                </a>
              </Link>
              <a className="nav-link">
                <button
                  type="button"
                  className="btn "
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  onClick={() => {
                    setLoading(true);
                    dispatch(logOutRequest(handleLoading));
                  }}
                >
                  Log Out
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
