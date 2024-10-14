import React from "react";
import { useState, useEffect } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import FullLayout from "../../components/UserDashboard/components/Layout/FullLayout";
import user from "../../components/TransporterDashboard/images/users/user1.jpg";
import { updateProfile } from "../../redux/transporter/transporter.actions";
import FileUploader from "../../components/FileUploader";
import { uploadImage } from "../../components/ImageUpload";
import convertImageToBase64 from "../../components/ImageBase64";

function Profile() {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const user = useSelector(({ auth }) => auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgName, setimgName] = useState("");
  const token = useSelector(({ auth }) => auth.token);
  const [data, setData] = useState({});
  const [validPhone, setValidPhone] = useState(true);

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };
  const handleLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (user !== null) {
      setData(user);
    }
    if (isLoggedIn || !isLoggedIn) {
      setLoaded(true);
    }
  }, [user, isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: data.name,
      email: data.email,
      phone_no: data.phone_no,
      address: data.address,
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
                        <h5 className="text-muted"> {data.email}</h5>
                      </div>
                      <div>
                        <h6 className="text-muted"> {data.phone_no}</h6>
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
