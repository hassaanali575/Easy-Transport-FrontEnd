import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useDispatch } from "react-redux";
import { errorNotification } from "../components/notification/notification";
import { resetPasswordRequests } from "../redux/auth/auth.actions";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [passMatch, setPassMatch] = useState(true);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    password: "",
    confirmpassword: "",
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
    const payload = {
      password: data.password,
    };
    dispatch(resetPasswordRequests(payload, handleLoading));
  };

  const PasswordMatch = () => {
    if (data.password != data.confirmpassword) {
      setPassMatch(false);
      return <div className="password-match">Password not Matched</div>;
    } else {
      setPassMatch(true);
      return <div></div>;
    }
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
                  <h2>Reset Your Password</h2>
                  <p>Go to Login Page</p>
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
                    <label className="label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      onChange={(e) => handleData("password", e.target.value)}
                      value={data.password}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm New Password"
                      onChange={(e) =>
                        handleData("confirmpassword", e.target.value)
                      }
                      value={data.confirmpassword}
                      required
                    />
                  </div>
                  {!data.confirmpassword ? <></> : <PasswordMatch />}

                  <div className="form-group">
                    {!passMatch ? (
                      <button type="submit" className="signin-btn" disabled>
                        Reset Password
                      </button>
                    ) : (
                      <button type="submit" className="signin-btn">
                        Reset Password
                      </button>
                    )}
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

export default ResetPassword;
