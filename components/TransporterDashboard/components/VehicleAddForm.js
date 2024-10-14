import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  errorNotification,
  warningNotification,
} from "../../notification/notification";
import { useDispatch, useSelector } from "react-redux";
import { registerVehicle } from "../../../redux/transporter/transporter.actions";
import FileUploader from "../../FileUploader";
import { uploadImage } from "../../ImageUpload";
import convertImageToBase64 from "../../ImageBase64";

const VehicleAddForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [imgName, setimgName] = useState("");
  const [validCharges, setValidCharges] = useState(true);
  const [validCapacity, setValidCapacity] = useState(true);
  const [data, setData] = useState({
    vehicleName: "",
    numberPlate: "",
    modelYear: "",
    transmissionType: "Auto",
    vehicleColor: "",
    charges: null,
    luggageCapacity: null,
    fromCity: "Manchetser",
    toCity: "Birmingham",
    photoUrl: "",
    vehicleType: "Car",
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
      if (
        data.vehicleType === "Small Truck" ||
        data.vehicleType === "Heavy Truck"
      ) {
        const payload = {
          vehicleType: data.vehicleType,
          name: data.vehicleName,
          numberPlate: data.numberPlate,
          modelYear: data.modelYear,
          transmission: data.transmissionType,
          color: data.vehicleColor,
          perDayPrice: data.charges,
          photoUrl: data.photoUrl,
          ratings: 0,
          fromCity: data.fromCity,
          toCity: data.toCity,
          luggageCapacity: data.luggageCapacity,
          booked: false,
          registeredOwner_id: user.id,
        };
        setLoading(true);
        dispatch(registerVehicle(payload, handleLoading));
      } else {
        const payload = {
          vehicleType: data.vehicleType,
          name: data.vehicleName,
          numberPlate: data.numberPlate,
          modelYear: data.modelYear,
          transmission: data.transmissionType,
          color: data.vehicleColor,
          perDayPrice: data.charges,
          photoUrl: data.photoUrl,
          ratings: 0,
          fromCity: data.fromCity,
          booked: false,
          registeredOwner_id: user.id,
        };
        setLoading(true);
        dispatch(registerVehicle(payload, handleLoading));
      }
    }
  };

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

  const ChargesValidation = () => {
    if (data.charges < 0) {
      setValidCharges(false);
      return (
        <div className="password-match">Charges should not less than 0</div>
      );
    } else {
      setValidCharges(true);
      return <div></div>;
    }
  };
  const CapacityValidation = () => {
    if (data.luggageCapacity < 1) {
      setValidCapacity(false);
      return (
        <div className="password-match">
          Luggage Capacity should not less than 1
        </div>
      );
    } else {
      setValidCapacity(true);
      return <div></div>;
    }
  };

  return (
    <div className="container">
      <div className="vehicleForm">
        <div className="d-flex">
          <div className="w-100">
            <h3 className="mb-4">Please Fill Vehicle Details Correctly</h3>
          </div>
        </div>
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
          <form onSubmit={(e) => handleSubmit(e)} className="row">
            <div className="col-md-4 form-group mb-3">
              <label className="label">Select Vehicle Type</label>
              <select
                id="vehicleType"
                className="form-control"
                onChange={(e) => handleData("vehicleType", e.target.value)}
              >
                <option value="Car">Car</option>
                <option value="Bus">Bus</option>
                <option value="Van">Van</option>
                <option value="Small Truck">Small Truck</option>
                <option value="Heavy Truck">Heavy Truck</option>
              </select>
            </div>
            <div className="col-md-4 form-group mb-3">
              <label className="label">Vehicle Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicle Name"
                value={data.vehicleName}
                onChange={(e) => handleData("vehicleName", e.target.value)}
                required
              />
            </div>
            <div className="col-md-4 form-group mb-3">
              <label className="label">Number Plate</label>
              <input
                type="text"
                className="form-control"
                placeholder="Number Plate"
                value={data.numberPlate}
                onChange={(e) => handleData("numberPlate", e.target.value)}
                required
              />
            </div>
            <div className="col-md-4 form-group mb-3">
              <label className="label">Model Year</label>
              <input
                type="text"
                className="form-control"
                placeholder="Model Year"
                value={data.modelYear}
                onChange={(e) => handleData("modelYear", e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 form-group mb-3">
              <label className="label">Select Transmission</label>
              <select
                id="selectCity"
                className="form-control"
                onChange={(e) => handleData("transmissionType", e.target.value)}
              >
                <option value="Auto">Auto</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div className="col-md-4 form-group mb-3">
              <label className="label">Vehicle Color</label>
              <input
                type="text"
                className="form-control"
                placeholder="Color"
                value={data.vehicleColor}
                onChange={(e) => handleData("vehicleColor", e.target.value)}
                required
              />
            </div>
            <div>
              {data.vehicleType === "Small Truck" ||
              data.vehicleType === "Heavy Truck" ? (
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label className="label">Luggage Capacity</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="KG Luggage Capacity"
                      value={data.luggageCapacity}
                      onChange={(e) =>
                        handleData("luggageCapacity", e.target.value)
                      }
                      required
                    />
                    {!data.luggageCapacity ? <></> : <CapacityValidation />}
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label className="label">Select From City</label>
                    <select
                      id="selectCity"
                      className="form-control"
                      onChange={(e) => handleData("fromCity", e.target.value)}
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
                  <div className="col-md-4 form-group mb-3">
                    <label className="label">Select To City</label>
                    <select
                      id="selectCity"
                      className="form-control"
                      onChange={(e) => handleData("toCity", e.target.value)}
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
                  <div className="col-md-4 form-group mb-3">
                    <label className="label">Average Charges</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Average Charges"
                      value={data.charges}
                      onChange={(e) => handleData("charges", e.target.value)}
                      required
                    />
                    {!data.charges ? <></> : <ChargesValidation />}
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label className="label">Vehicle Picture</label>
                    <FileUploader
                      placeholder={imgName ? imgName : "Click here to upload"}
                      accept={["image/jpeg", "image/png", "image/bmp"]}
                      maxFiles={1}
                      maxSize={3000000}
                      onDrop={(acceptedFiles, rejectedFiles) =>
                        onDrop(acceptedFiles, rejectedFiles, "Image")
                      }
                    />
                  </div>
                  <div className="col-md-4 mb-3 vehicleButton ">
                    {(!validCharges && data.charges != "") ||
                    (!validCapacity && data.luggageCapacity != "") ? (
                      <button type="submit" disabled className="signin-btn">
                        Register Vehicle
                      </button>
                    ) : (
                      <button type="submit" className="signin-btn">
                        Register Vehicle
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label className="label">Select City</label>
                    <select
                      id="selectCity"
                      className="form-control"
                      onChange={(e) => handleData("fromCity", e.target.value)}
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
                  <div className="col-md-4 form-group mb-3">
                    <label className="label">PerDay Charges</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="PerDay Charges"
                      value={data.charges}
                      onChange={(e) => handleData("charges", e.target.value)}
                      required
                    />
                    {!data.charges ? <></> : <ChargesValidation />}
                  </div>
                  <div className="col-md-4 form-group mb-3">
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
                  <div className="col-md-4 mb-3 vehicleButton">
                    {!validCharges && data.charges != "" ? (
                      <button type="submit" disabled className="signin-btn">
                        Register Vehicle
                      </button>
                    ) : (
                      <button type="submit" className="signin-btn">
                        Register Vehicle
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VehicleAddForm;
