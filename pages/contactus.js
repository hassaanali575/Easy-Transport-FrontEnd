import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  errorNotification,
  warningNotification,
} from "../components/notification/notification";
import { contactUs } from "../redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
const ContactUs = () => {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };
  const handleLoading = () => {
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      errorNotification("Error", "Please Login First to Send Message");
      return;
    } else {
      var payload = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        user_id: user.id,
      };
      setLoading(true);
      dispatch(contactUs(payload, handleLoading));
    }
  };

  return (
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
                  <h2>Contact Us</h2>
                  <div className="d-flex justify-content-center">
                    <div>
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>
                    <div className="h5 ms-1">Address</div>
                  </div>
                  <p className="d-flex justify-content-center">
                    University of Law London
                  </p>
                  <div className="d-flex justify-content-center">
                    <div>
                      <i className="bi bi-envelope-fill"></i>
                    </div>
                    <div className="h5 ms-2">General Support</div>
                  </div>
                  <p className="d-flex justify-content-center">
                    easytransport@company.com
                  </p>
                  <div className="d-flex justify-content-center">
                    <div>
                      <i className="bi bi-telephone-fill"></i>
                    </div>
                    <div className="h5 ms-2">Lets Talk</div>
                  </div>
                  <p className="d-flex justify-content-center">+773047428472</p>
                </div>
              </div>
              <div className="login-wrap p-4 p-lg-5">
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
                  <>
                    {" "}
                    <div className="d-flex">
                      <div className="w-100">
                        <h3 className="mb-4">Get in Touch</h3>
                      </div>
                    </div>
                    <form
                      onSubmit={(e) => handleSubmit(e)}
                      className="signin-form"
                    >
                      <div className="form-group mb-3">
                        <label className="label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          onChange={(e) => handleData("name", e.target.value)}
                          value={data.name}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          onChange={(e) => handleData("email", e.target.value)}
                          value={data.email}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="label">Subject</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Subject"
                          onChange={(e) =>
                            handleData("subject", e.target.value)
                          }
                          value={data.subject}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="label">Message</label>
                        <textarea
                          type="text"
                          rows="5"
                          maxLength="500"
                          className="form-control"
                          id="form-message"
                          placeholder="Message"
                          onChange={(e) =>
                            handleData("message", e.target.value)
                          }
                          value={data.message}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <button type="submit" className="signin-btn">
                          Submit
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
