import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Card, CardBody, CardTitle } from "reactstrap";
import Image from "next/image";
import Link from "next/link";
import FullLayout from "../../components/TransporterDashboard/components/Layout/FullLayout";
import VehicleAddForm from "../../components/TransporterDashboard/components/VehicleAddForm";
import user1 from "../../assets/images/car.png";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getVehicles,
  deleteVehicle,
  makeVehicleAvailable,
} from "../../redux/transporter/transporter.actions";
import {
  errorNotification,
  warningNotification,
} from "../../components/notification/notification";
import { connect } from "react-redux";
import ErrorPage from "../../pages/error/404page";
import FileUploader from "../../components/FileUploader";
import { uploadImage } from "../../components/ImageUpload";
import convertImageToBase64 from "../../components/ImageBase64";
import { updateVehicle } from "../../redux/transporter/transporter.actions";

const TransporterVehicles = () => {
  const user = useSelector(({ auth }) => auth.user);
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const registerVehicles = useSelector(
    ({ transporter }) => transporter.transporterVehicles
  );
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [imgName, setimgName] = useState("");
  const [vehicleData, setvehicleData] = useState({});

  const handleData = (key, value) => {
    setvehicleData({ ...vehicleData, [key]: value });
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleLoading = () => {
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      vehicleData.vehicleType === "Small Truck" ||
      vehicleData.vehicleType === "Heavy Truck"
    ) {
      const payload = {
        vehicleType: vehicleData.vehicleType,
        name: vehicleData.name,
        numberPlate: vehicleData.numberPlate,
        modelYear: vehicleData.modelYear,
        transmission: vehicleData.transmission,
        color: vehicleData.color,
        perDayPrice: vehicleData.perDayPrice,
        photoUrl: vehicleData.photoUrl,
        ratings: 0,
        fromCity: vehicleData.fromCity,
        toCity: vehicleData.toCity,
        luggageCapacity: vehicleData.luggageCapacity,
        booked: false,
        registeredOwner_id: user.id,
      };
      const vehicleId = vehicleData.id;
      dispatch(updateVehicle(payload, vehicleId, handleLoading));
      setTimeout(() => {
        getRegisteredVehicles();
      }, 1000);
    } else {
      const payload = {
        vehicleType: vehicleData.vehicleType,
        name: vehicleData.name,
        numberPlate: vehicleData.numberPlate,
        modelYear: vehicleData.modelYear,
        transmission: vehicleData.transmission,
        color: vehicleData.color,
        perDayPrice: vehicleData.perDayPrice,
        photoUrl: vehicleData.photoUrl,
        ratings: 0,
        fromCity: vehicleData.fromCity,
        booked: false,
        registeredOwner_id: user.id,
      };
      const vehicleId = vehicleData.id;
      dispatch(updateVehicle(payload, vehicleId, handleLoading));
      setTimeout(() => {
        getRegisteredVehicles();
      }, 1000);
    }
  };

  const getRegisteredVehicles = () => {
    const payload = {
      registeredOwner_id: user.id,
    };
    setLoading(true);
    dispatch(getVehicles(payload, handleLoading));
  };

  useEffect(() => {
    if (user !== null) {
      getRegisteredVehicles();
    }
  }, [user]);

  useEffect(() => {
    if (registerVehicles !== null) {
      setVehicles(registerVehicles);
    }
    if (isLoggedIn || !isLoggedIn) {
      setLoaded(true);
    }
  }, [registerVehicles, isLoggedIn]);

  const makeAvailable = (ownerid, vehicleid) => {
    const payload = {
      registeredOwner_id: ownerid,
      vehicle_id: vehicleid,
      booking_type: "vehicle",
    };
    dispatch(makeVehicleAvailable(payload, handleLoading));
    setTimeout(() => {
      getRegisteredVehicles();
    }, 1000);
  };

  const handleDelete = (ownerid, vehicleid) => {
    const payload = {
      registeredOwner_id: ownerid,
      vehicle_id: vehicleid,
    };
    dispatch(deleteVehicle(payload, handleLoading));
    setTimeout(() => {
      getRegisteredVehicles();
    }, 1000);
  };
  function handleEditModal(vehicle) {
    setvehicleData(vehicle);
  }
  const onDrop = (acceptedFiles, rejectedFiles, imgName) => {
    if (rejectedFiles.length > 0) {
      warningNotification(
        "Warning",
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

  useEffect(() => {
    if (loaded) {
      if (!isLoggedIn) {
        router.push("/login");
      }
    }
  }, [isLoggedIn, loaded]);

  return (
    <div>
      <FullLayout>
        <div>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleShow}
              >
                Add New Vehicle
              </button>
            </CardTitle>
            <CardBody className="">
              <div className="mt-3">{show ? <VehicleAddForm /> : <></>}</div>
            </CardBody>
          </Card>

          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-truck me-2" />
              Registered Vehicles
            </CardTitle>
            <CardBody className="">
              {loading ? (
                <div className="d-flex justify-content-center vehicles-spinner">
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
                <div className="row scrollit">
                  {vehicles.map((vehicle, key) => (
                    <>
                      <div className="col-md-6 col-lg-4">
                        <Card>
                          <Image
                            src={vehicle.photoUrl}
                            alt="hero banner"
                            width={500}
                            height={250}
                            layout="responsive"
                          />
                          <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                              <h6 className="mb-0">Vehicle Name</h6>
                              <p className="mb-0 text-muted text-capitalize">
                                {vehicle.name}
                              </p>
                            </div>

                            {vehicle.vehicleType === "Small Truck" ||
                            vehicle.vehicleType === "Heavy Truck" ? (
                              <div className="d-flex justify-content-between mb-3">
                                <h6 className="mb-0">City</h6>
                                <p className="text-muted mb-0 text-capitalize">
                                  {vehicle.fromCity} To {vehicle.toCity}
                                </p>
                              </div>
                            ) : (
                              <div className="d-flex justify-content-between mb-3">
                                <h6 className="mb-0">City</h6>
                                <p className="text-muted mb-0 text-capitalize">
                                  {vehicle.fromCity}
                                </p>
                              </div>
                            )}
                            <div className="d-flex justify-content-between mb-3">
                              <h6 className="mb-0">Number Plate</h6>
                              <p className="text-muted mb-0 text-uppercase">
                                {vehicle.numberPlate}
                              </p>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                              <h6 className="mb-0">Booking Status</h6>
                              <p className="text-muted mb-0">
                                {!vehicle.booked ? (
                                  <>Available</>
                                ) : (
                                  <h6
                                    className="mb-2 text-danger cursor-pointer "
                                    onClick={() =>
                                      makeAvailable(
                                        vehicle.registeredOwner_id,
                                        vehicle.id
                                      )
                                    }
                                  >
                                    Make Available
                                  </h6>
                                )}
                              </p>
                            </div>
                            <div className="topBorder mb-3"></div>
                            <div className="d-flex justify-content-between">
                              <button
                                type="button"
                                className="btn-success tableButton"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={(e) => handleEditModal(vehicle)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn-danger tableButton"
                                onClick={() =>
                                  handleDelete(
                                    vehicle.registeredOwner_id,
                                    vehicle.id
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </FullLayout>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Vehicle Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => handleSubmit(e)} className="row">
                <div className="col-md-6 form-group mb-3">
                  <label className="label">Select Vehicle Type</label>
                  <select
                    id="vehicleType"
                    className="form-control"
                    onChange={(e) => handleData("vehicleType", e.target.value)}
                    value={vehicleData.vehicleType}
                    disabled
                  >
                    <option value="Car">Car</option>
                    <option value="Bus">Bus</option>
                    <option value="Van">Van</option>
                    <option value="Small Truck">Small Truck</option>
                    <option value="Heavy Truck">Heavy Truck</option>
                  </select>
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label className="label">Vehicle Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Vehicle Name"
                    value={vehicleData.name}
                    onChange={(e) => handleData("name", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label className="label">Number Plate</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Number Plate"
                    value={vehicleData.numberPlate}
                    onChange={(e) => handleData("numberPlate", e.target.value)}
                    disabled
                  />
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label className="label">Model Year</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Model Year"
                    value={vehicleData.modelYear}
                    onChange={(e) => handleData("modelYear", e.target.value)}
                    disabled
                  />
                </div>

                <div className="col-md-6 form-group mb-3">
                  <label className="label">Select Transmission</label>
                  <select
                    id="selectCity"
                    className="form-control"
                    onChange={(e) => handleData("transmission", e.target.value)}
                    value={vehicleData.transmission}
                    disabled
                  >
                    <option value="Auto">Auto</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label className="label">Vehicle Color</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Color"
                    value={vehicleData.color}
                    onChange={(e) => handleData("color", e.target.value)}
                    required
                  />
                </div>
                {vehicleData.vehicleType === "Small Truck" ||
                vehicleData.vehicleType === "Heavy Truck" ? (
                  <>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">Luggage Capacity</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="KG Luggage Capacity"
                        value={vehicleData.luggageCapacity}
                        min={1}
                        onChange={(e) =>
                          handleData("luggageCapacity", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">Select From City</label>
                      <select
                        id="selectCity"
                        className="form-control"
                        onChange={(e) => handleData("fromCity", e.target.value)}
                        value={vehicleData.fromCity}
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
                      <label className="label">Select To City</label>
                      <select
                        id="selectCity"
                        className="form-control"
                        onChange={(e) => handleData("toCity", e.target.value)}
                        value={vehicleData.toCity}
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
                      <label className="label">Average Charges</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Average Charges"
                        value={vehicleData.perDayPrice}
                        onChange={(e) =>
                          handleData("perDayPrice", e.target.value)
                        }
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">PerDay Charges</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="PerDay Charges"
                        value={vehicleData.perDayPrice}
                        onChange={(e) =>
                          handleData("perDayPrice", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="label">Select City</label>
                      <select
                        id="selectCity"
                        className="form-control"
                        onChange={(e) => handleData("fromCity", e.target.value)}
                        value={vehicleData.fromCity}
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
                  </>
                )}
                <div className="col-md-6 form-group mb-3">
                  <label className="label">Vehicle Picture</label>
                  <FileUploader
                    placeholder={imgName ? imgName : "Click here to upload"}
                    accept={["image/jpeg", "image/png", "image/bmp"]}
                    maxFiles={1}
                    maxSize={1000000}
                    onDrop={(acceptedFiles, rejectedFiles) =>
                      onDrop(acceptedFiles, rejectedFiles, "frontSideImage")
                    }
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-danger tableButton"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn-success tableButton">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransporterVehicles;
