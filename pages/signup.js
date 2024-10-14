import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  errorNotification,
  warningNotification,
} from "../components/notification/notification";
import { userSignUpRequest } from "../redux/auth/auth.actions";
import FileUploader from "../components/FileUploader";
import { uploadImage } from "../components/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import convertImageToBase64 from "../components/ImageBase64";
import { useRouter } from "next/router";
import Page404Error from "../pages/error/404page";

const Signup = () => {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [imgName, setimgName] = useState("");
  const [imgNameLicense, setimgNameLicense] = useState("");
  const [imgNameCnic, setimgNameCnic] = useState("");
  const [passMatch, setPassMatch] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validCnic, setValidCnic] = useState(true);
  const [validAge, setValidAge] = useState(true);
  const [validCharges, setValidCharges] = useState(true);
  const [validExp, setValidExp] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmpassword: "",
    cnic: "",
    age: null,
    city: "London",
    perDayCharges: null,
    driverType: "Car",
    drivingExperience: null,
    drivingLicense: "",
    licenseExpiry: "",
    photoUrl: "",
    accountType: "Customer",
    role: "user",
  });

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };
  const handleLoading = () => {
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.photoUrl) {
      errorNotification("Error", "Please Upload Image");
      return;
    } else {
      if (data.accountType === "Customer") {
        var payload = {
          name: data.name,
          email: data.email,
          phone_no: data.phone,
          address: data.address,
          city: data.city,
          password: data.password,
          photoUrl: data.photoUrl,
          user_type: data.accountType,
          role: data.role,
        };
      } else if (data.accountType === "Transporter") {
        var payload = {
          name: data.name,
          email: data.email,
          phone_no: data.phone,
          address: data.address,
          city: data.city,
          cnic: data.cnic,
          password: data.password,
          photoUrl: data.photoUrl,
          user_type: data.accountType,
          role: data.role,
        };
      } else {
        var payload = {
          name: data.name,
          email: data.email,
          phone_no: data.phone,
          address: data.address,
          city: data.city,
          cnic: data.cnic,
          role: "user",
          perDayPrice: data.perDayCharges,
          driver_type: data.driverType,
          license_number: data.drivingLicense,
          expiry_date: data.licenseExpiry.replaceAll("-", "/"),
          drive_experience: data.drivingExperience,
          age: data.age,
          password: data.password,
          photoUrl: data.photoUrl,
          user_type: data.accountType,
          role: data.role,
          booked: false,
        };
      }
      setLoading(true);
      dispatch(userSignUpRequest(payload, handleLoading));
    }
  };

  const PhoneValidation = () => {
    let phoneNo = /^((\+44)?(0044)?(0)?)(7)(\d{9})$/;
    if (data.phone.match(phoneNo)) {
      setValidPhone(true);
      return <div></div>;
    } else {
      setValidPhone(false);
      return (
        <div className="password-match">Please Enter Correct Phone Number</div>
      );
    }
  };

  const BRPValidation = () => {
    if (
      !/^[0-9]+$/.test(data.cnic) ||
      data.cnic.length < 13 ||
      data.cnic.length > 13
    ) {
      setValidCnic(false);
      return (
        <div className="password-match">Please Enter Correct BRP Number</div>
      );
    } else {
      setValidCnic(true);
      return <></>;
    }
  };
  const AgeValidation = () => {
    if (data.age < 18) {
      setValidAge(false);
      return <div className="password-match">Age should not less than 18</div>;
    } else {
      setValidAge(true);
      return <div></div>;
    }
  };
  const ExpValidation = () => {
    if (data.drivingExperience < 0) {
      setValidExp(false);
      return (
        <div className="password-match">Experience should not less than 0</div>
      );
    } else {
      setValidExp(true);
      return <div></div>;
    }
  };
  const ChargesValidation = () => {
    if (data.perDayCharges < 0) {
      setValidCharges(false);
      return (
        <div className="password-match">Charges should not less than 0</div>
      );
    } else {
      setValidCharges(true);
      return <div></div>;
    }
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

  const onDrop = (acceptedFiles, rejectedFiles, imgName) => {
    if (rejectedFiles.length > 0) {
      warningNotification(
        "warning",
        "Upload only one image and size limit of 1 MB"
      );
      return;
    } else if (acceptedFiles) {
      convertImageToBase64(acceptedFiles[0], (result, success) => {
        if (success) {
          uploadImage(result, (url, success) => {
            if (success) {
              handleData("photoUrl", `${url}`);
              setimgName(acceptedFiles[0].name);
            }
          });
        }
      });
    }
  };
  const onDropLicense = (acceptedFiles, rejectedFiles, imgNameLicense) => {
    if (rejectedFiles.length > 0) {
      warningNotification(
        "warning",
        "Upload only one image and size limit of 1 MB"
      );
      return;
    } else if (acceptedFiles) {
      convertImageToBase64(acceptedFiles[0], (result, success) => {
        if (success) {
          uploadImage(result, (url, success) => {
            if (success) {
              handleData("drivingLicense", `${url}`);
              setimgNameLicense(acceptedFiles[0].name);
            }
          });
        }
      });
    }
  };
  const onDropBRP = (acceptedFiles, rejectedFiles, imgNameCnic) => {
    if (rejectedFiles.length > 0) {
      warningNotification(
        "warning",
        "Upload only one image and size limit of 1 MB"
      );
      return;
    } else if (acceptedFiles) {
      convertImageToBase64(acceptedFiles[0], (result, success) => {
        if (success) {
          uploadImage(result, (url, success) => {
            if (success) {
              handleData("cnic", `${url}`);
              setimgNameCnic(acceptedFiles[0].name);
            }
          });
        }
      });
    }
  };

  const handleRouter = () => {
    // e.preventDefault()
    router.push("/dashboard");
  };

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
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
                      <h2>Welcome to Sign Up</h2>
                      <p>Already have an account?</p>
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
                        <h3 className="mb-4">Sign Up</h3>
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
                      <div className="d-flex justify-content-center signup-spinner">
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
                          <label className="label">Select Account Type</label>
                          <select
                            id="accountType"
                            className="form-control"
                            onChange={(e) =>
                              handleData("accountType", e.target.value)
                            }
                          >
                            <option value="Customer">Customer</option>
                            <option value="Transporter">Transporter</option>
                            <option value="Driver">Driver</option>
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <label className="label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={data.name}
                            onChange={(e) => handleData("name", e.target.value)}
                            required
                          />
                        </div>
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
                          <label className="label">Phone Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="Phone Number"
                            value={data.phone}
                            onChange={(e) =>
                              handleData("phone", e.target.value)
                            }
                            required
                          />
                        </div>
                        {!data.phone ? <></> : <PhoneValidation />}
                        <div className="form-group mb-3">
                          <label className="label">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            value={data.address}
                            onChange={(e) =>
                              handleData("address", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="label">Select City</label>
                          <select
                            id="accountType"
                            className="form-control"
                            onChange={(e) => handleData("city", e.target.value)}
                          >
                            <option value="Manchester">Manchester</option>
                            <option value="Birmingham">Birmingham</option>
                            <option value="London">London</option>
                            <option value="Leeds">Leeds</option>
                            <option value="Warrington">Warrington</option>
                            <option value="Cardiff">Cardiff</option>
                            <option value="Bristol">Bristol</option>
                          </select>
                        </div>
                        {data.accountType === "Transporter" ? (
                          <div>
                            <div className="form-group mb-3">
                              <label className="label">BRP Picture</label>
                              <FileUploader
                                placeholder={
                                  imgNameCnic
                                    ? imgNameCnic
                                    : "Click here to upload"
                                }
                                accept={[
                                  "image/jpeg",
                                  "image/png",
                                  "image/bmp",
                                ]}
                                maxFiles={1}
                                maxSize={1000000}
                                onDrop={(acceptedFiles, rejectedFiles) =>
                                  onDropBRP(
                                    acceptedFiles,
                                    rejectedFiles,
                                    "Image"
                                  )
                                }
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            {data.accountType === "Driver" ? (
                              <div>
                                <div className="form-group mb-3">
                                  <label className="label">Age</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Age"
                                    value={data.age}
                                    onChange={(e) =>
                                      handleData("age", e.target.value)
                                    }
                                    required
                                  />
                                  {!data.age ? <></> : <AgeValidation />}
                                </div>
                                <div className="form-group mb-3">
                                  <label className="label">BRP Picture</label>
                                  <FileUploader
                                    placeholder={
                                      imgNameCnic
                                        ? imgNameCnic
                                        : "Click here to upload"
                                    }
                                    accept={[
                                      "image/jpeg",
                                      "image/png",
                                      "image/bmp",
                                    ]}
                                    maxFiles={1}
                                    maxSize={1000000}
                                    onDrop={(acceptedFiles, rejectedFiles) =>
                                      onDropBRP(
                                        acceptedFiles,
                                        rejectedFiles,
                                        "Image"
                                      )
                                    }
                                  />
                                </div>
                                <div className="form-group mb-3">
                                  <label className="label">
                                    Driving License
                                  </label>
                                  <FileUploader
                                    placeholder={
                                      imgNameLicense
                                        ? imgNameLicense
                                        : "Click here to upload"
                                    }
                                    accept={[
                                      "image/jpeg",
                                      "image/png",
                                      "image/bmp",
                                    ]}
                                    maxFiles={1}
                                    maxSize={1000000}
                                    onDrop={(acceptedFiles, rejectedFiles) =>
                                      onDropLicense(
                                        acceptedFiles,
                                        rejectedFiles,
                                        "Image"
                                      )
                                    }
                                  />
                                </div>
                                <div className="form-group mb-3">
                                  <label className="label">
                                    License Expiry Date
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    placeholder="dd-mm-yyyy"
                                    value={data.licenseExpiry}
                                    min={disablePastDate()}
                                    onChange={(e) =>
                                      handleData(
                                        "licenseExpiry",
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group mb-3">
                                  <label className="label">
                                    Per Day Charges
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Per Day Charges "
                                    value={data.perDayCharges}
                                    onChange={(e) =>
                                      handleData(
                                        "perDayCharges",
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                  {!data.perDayCharges ? (
                                    <></>
                                  ) : (
                                    <ChargesValidation />
                                  )}
                                </div>
                                <div className="form-group mb-3">
                                  <label className="label">
                                    Driving Experience
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Driving Experience Years"
                                    value={data.drivingExperience}
                                    onChange={(e) =>
                                      handleData(
                                        "drivingExperience",
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                  {!data.drivingExperience ? (
                                    <></>
                                  ) : (
                                    <ExpValidation />
                                  )}
                                </div>
                                <div className="form-group mb-3">
                                  <label className="label">
                                    Select Driver Type
                                  </label>
                                  <select
                                    id="driverType"
                                    className="form-control"
                                    onChange={(e) =>
                                      handleData("driverType", e.target.value)
                                    }
                                  >
                                    <option value="Car">Car</option>
                                    <option value="Bus">Bus</option>
                                    <option value="Van">Van</option>
                                    <option value="Small Truck">
                                      Small Truck
                                    </option>
                                    <option value="Heavy Truck">
                                      Heavy Truck
                                    </option>
                                  </select>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        )}

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
                        <div className="form-group mb-3">
                          <label className="label">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={data.confirmpassword}
                            onChange={(e) =>
                              handleData("confirmpassword", e.target.value)
                            }
                            required
                          />
                        </div>
                        {!data.confirmpassword ? <></> : <PasswordMatch />}

                        <label className="label">Profile Picture</label>
                        <FileUploader
                          placeholder={
                            imgName ? imgName : "Click here to upload"
                          }
                          accept={["image/jpeg", "image/png", "image/bmp"]}
                          maxFiles={1}
                          maxSize={1000000}
                          onDrop={(acceptedFiles, rejectedFiles) =>
                            onDrop(acceptedFiles, rejectedFiles, "Image")
                          }
                        />
                        {!passMatch ||
                        (!validExp && data.drivingExperience != "") ||
                        (!validAge && data.age != "") ||
                        (!validCharges && data.perDayCharges != "") ||
                        (!validPhone && data.phone != "") ||
                        (!validCnic && data.cnic != "") ? (
                          <div className="form-group">
                            <button
                              type="submit"
                              disabled
                              className="signin-btn"
                            >
                              Sign Up
                            </button>
                          </div>
                        ) : (
                          <div className="form-group">
                            <button type="submit" className="signin-btn">
                              Sign Up
                            </button>
                          </div>
                        )}
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

export default Signup;
