import React from "react";
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from '../styles/Home.module.css'
import { useDispatch } from "react-redux";
import { forgotpasswordrequests } from "../redux/auth/auth.actions";

const Login = () => {

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
  });

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleLoading = () => {
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(forgotpasswordrequests(data, handleLoading));
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">Easy Transport</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10 justify-content-center">
            <div className="wrap d-md-flex">
              <div className="text-wrap p-5 p-lg-5 text-center d-flex align-items-center order-md-last">
                <div className="text w-100">
                  <h2>Welcome to Forget Password</h2>
                  <p>Go To Login Page</p>
                  <Link href="/login">
                    <a>
                      <button
                        type="button"
                        className="btn-white btn-outline-white "
                      >
                        Login
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="login-wrap p-4 p-lg-5">
                <div className="d-flex">
                  <div className="w-100">
                    <h3 className="mb-4">Reset Password</h3>
                  </div>
                 
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className="signin-form">
                  <div className="form-group mb-3">
                    <label className="label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                      onChange={(e) => handleData("email", e.target.value)}
                      value={data.email}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <button type="submit" className="signin-btn" >
                      Reset Password
                    </button>                  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
