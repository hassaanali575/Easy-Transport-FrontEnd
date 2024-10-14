import React from "react";
import { useState, useEffect } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import FullLayout from "../../components/DriverDashboard/components/Layout/FullLayout";
import { makeDriverAvailable } from "../../redux/drivers/driver.actions";
import FileUploader from "../../components/FileUploader";
import { uploadImage } from "../../components/ImageUpload";
import convertImageToBase64 from "../../components/ImageBase64";
import { updateProfile } from "../../redux/transporter/transporter.actions";

function Profile() {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const user = useSelector(({ auth }) => auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector(({ auth }) => auth.token);
  const [data, setData] = useState({});
  const [imgName, setimgName] = useState("");
  const [imgNameCnic, setimgNameCnic] = useState("");
  const [imgNameLicense, setimgNameLicense] = useState("");
  const [validPhone, setValidPhone] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setData(user);
    }
    if (isLoggedIn || !isLoggedIn) {
      setLoaded(true);
    }
  }, [user, isLoggedIn]);

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };
  const handleLoading = () => {
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: data.name,
      email: data.email,
      phone_no: data.phone_no,
      age: data.age,
      perDayPrice: data.perDayPrice,
      address: data.address,
      driver_type: data.driver_type,
      license_number: data.license_number,
      drive_experience: data.drive_experience,
      expiry_date: data.expiry_date.split("T")[0].replaceAll("-", "/"),
      city: data.city,
      photoUrl: data.photoUrl,
      role: "user",
    };
    const userId = user.id;
    dispatch(updateProfile(payload, userId, handleLoading));
  };

  useEffect(() => {
    if (loaded) {
      if (!isLoggedIn) {
        router.push("/login");
      }
    }
  }, [isLoggedIn, loaded]);

  const makeAvailable = () => {
    const payload = {
      registeredOwner_id: user.id,
      booking_type: "driver",
    };
    dispatch(makeDriverAvailable(payload, handleLoading));
  };

  const PhoneValidation = () => {
    let phoneNo = /^((\+44)?(0044)?(0)?)(7)(\d{9})$/;
    if (data.phone_no.match(phoneNo)) {
      setValidPhone(true);
      return <div></div>;
    } else {
      setValidPhone(false);
      return (
        <div className="password-match">Please Enter Correct Phone Number</div>
      );
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
  const onDropCnic = (acceptedFiles, rejectedFiles, imgName) => {
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

  const onDropLicense = (acceptedFiles, rejectedFiles, imgName) => {
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
              handleData("license_number", `${url}`);
              setimgNameCnic(acceptedFiles[0].name);
            }
          });
        }
      });
    }
  };

  return (
    <div>
      <FullLayout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <Card className="bg-white">
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                  <i className="bi bi-person me-2" />
                  Edit Profile
                </CardTitle>
                <CardBody>
                  <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="signin-form row"
                  >
                    <div className="col-md-6 form-group mb-3">
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
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => handleData("email", e.target.value)}
                        disabled
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone Number"
                        value={data.phone_no}
                        onChange={(e) => handleData("phone_no", e.target.value)}
                        required
                      />
                      {!data.phone_no ? <></> : <PhoneValidation />}
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={data.address}
                        onChange={(e) => handleData("address", e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">City</label>
                      <select
                        id="selectCity"
                        className="form-control"
                        value={data.city}
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
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">BRP Picture</label>
                      <FileUploader
                        placeholder={
                          imgNameCnic ? imgNameCnic : "Click here to upload"
                        }
                        accept={["image/jpeg", "image/png", "image/bmp"]}
                        maxFiles={1}
                        maxSize={1000000}
                        onDrop={(acceptedFiles, rejectedFiles) =>
                          onDropCnic(acceptedFiles, rejectedFiles, "Image")
                        }
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">Age</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Age"
                        value={data.age}
                        onChange={(e) => handleData("age", e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">Driving License Picture</label>
                      <FileUploader
                        placeholder={
                          imgNameLicense
                            ? imgNameLicense
                            : "Click here to upload"
                        }
                        accept={["image/jpeg", "image/png", "image/bmp"]}
                        maxFiles={1}
                        maxSize={1000000}
                        onDrop={(acceptedFiles, rejectedFiles) =>
                          onDropLicense(acceptedFiles, rejectedFiles, "Image")
                        }
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">License Expiry Date</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="dd-mm-yyyy"
                        value={data.expiry_date?.split("T")[0]}
                        onChange={(e) =>
                          handleData("expiry_date", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">Per Day Charges</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Per Day Charges "
                        value={data.perDayPrice}
                        onChange={(e) =>
                          handleData("perDayPrice", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">Driving Experience</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Driving Experience Years"
                        value={data.drive_experience}
                        onChange={(e) =>
                          handleData("drive_experience", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">Select Driver Type</label>
                      <select
                        id="driverType"
                        className="form-control"
                        value={data.driver_type}
                        onChange={(e) =>
                          handleData("driver_type", e.target.value)
                        }
                      >
                        <option value="Car">Car</option>
                        <option value="Bus">Bus</option>
                        <option value="Van">Van</option>
                        <option value="Small Truck">Small Truck</option>
                        <option value="Heavy Truck">Heavy Truck</option>
                      </select>
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">Profile Picture</label>
                      <FileUploader
                        placeholder={imgName ? imgName : "Click here to upload"}
                        accept={["image/jpeg", "image/png", "image/bmp"]}
                        maxFiles={1}
                        maxSize={1000000}
                        onDrop={(acceptedFiles, rejectedFiles) =>
                          onDrop(acceptedFiles, rejectedFiles, "Image")
                        }
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3 form-group vehicleButton">
                      {!validPhone && data.phone != "" ? (
                        <button type="submit" className="signin-btn" disabled>
                          Update Profile
                        </button>
                      ) : (
                        <button type="submit" className="signin-btn">
                          Update Profile
                        </button>
                      )}
                    </div>
                  </form>
                </CardBody>
              </Card>
            </div>

            <div className="col-md-4">
              <Card className="bg-white">
                <CardTitle
                  tag="h6"
                  className="border-bottom text-center p-3 mb-0 "
                >
                  <i className="bi bi-person me-2" />
                  Your Profile
                </CardTitle>
                <CardBody>
                  <div className="justify-content-center row">
                    <div className="transporterImg">
                      {data.photoUrl ? (
                        <Image
                          src={data.photoUrl}
                          alt="hero banner"
                          height={300}
                          width={300}
                          className="rounded-circle"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  {user != null ? (
                    <div className="text-center">
                      <h3 className="text-danger">{user.name}</h3>
                      <div className="d-flex row">
                        <h5 className="text-muted">{user.email}</h5>
                      </div>
                      <div>
                        <h6 className="text-muted"> {user.phone_no}</h6>
                      </div>
                      <div className="d-flex justify-content-center mb-3">
                        <h6 className="mb-0 text-muted">Driver Status:</h6>
                        <p className="text-muted mb-0 ms-2">
                          {!user.booked ? (
                            <h6>Available</h6>
                          ) : (
                            <h6
                              className="mb-2 text-danger cursor-pointer  "
                              onClick={() => makeAvailable()}
                            >
                              Make Available
                            </h6>
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </FullLayout>
    </div>
  );
}

export default Profile;
