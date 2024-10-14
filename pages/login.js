import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { loginRequest } from "../redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  errorNotification,
  warningNotification,
  infoNotification,
} from "../components/notification/notification";
import Page404Error from "../pages/error/404page";

const Login = () => {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
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
    dispatch(loginRequest(data, handleLoading));
  };

  const handleRouter = () => {
    router.push("/dashboard");
  };

  return (
    <div>
      {isLoggedIn ? (
        handleRouter()
      ) : (
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section text-muted">Easy Transport</h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-10 justify-content-center">
                <div className="wrap d-md-flex">
                  <div className="text-wrap p-5 p-lg-5 text-center d-flex align-items-center order-md-last">
                    <div className="text w-100">
                      <h2>Welcome to Login</h2>
                      <p>Do not have an account?</p>
                      <Link href="/signup">
                        <a>
                          <button
                            type="button"
                            className="btn-white btn-outline-white "
                          >
                            Sign Up
                          </button>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="login-wrap p-4 p-lg-5">
                    <div className="d-flex">
                      <div className="w-100">
                        <h3 className="mb-4">Sign In</h3>
                      </div>
                      {/* <div className="w-100">
                    <p className="social-media d-flex justify-content-end">
                      <a
                        href="#"
                        className="social-icon d-flex align-items-center justify-content-center"
                      >
                        <span className="fa fa-google"></span>
                      </a>
                     
                    </p>
                  </div> */}
                    </div>
                    {loading ? (
                      <div className="d-flex justify-content-center ftco-section">
                        <div className="spinner-grow text-danger" role="status">
                          <span className="sr-only">Loading...</span>{" "}
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                          <span className="sr-only">Loading...</span>{" "}
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                          <span className="sr-only">Loading...</span>{" "}
                        </div>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="signin-form"
                      >
                        <div className="form-group mb-3">
                          <label className="label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) =>
                              handleData("email", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="label">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                              handleData("password", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="form-group">
                          <button type="submit" className="signin-btn">
                            Sign In
                          </button>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <Link href="/forget-password" passHref>
                            <a className="forget-password">Forgot password?</a>
                          </Link>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Login;
