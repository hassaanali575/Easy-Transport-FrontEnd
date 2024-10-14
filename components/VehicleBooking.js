import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  errorNotification,
  warningNotification,
} from "./notification/notification";
import { Card, CardTitle, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { vehicleBookingRequest } from "../redux/vehicles/vehicles.actions";

const VehicleBooking = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [imgName, setimgName] = useState("");
  const vehicle = props.vehicleDetails;
  const [validPhone, setValidPhone] = useState(true);
  const [validCnic, setValidCnic] = useState(true);
  const [data, setData] = useState({
    Name: "",
    PhoneNo: "",
    Address: "",
    CNIC: "",
    FromCity: "",
    ToCity: "",
    DateIn: "",
    DateOut: "",
  });

  const CNICValidation = () => {
    if (!/^[A-Z]{1}[0-9]{7}[A-Z]{2}$/) {
      setValidCnic(false);
      return (
        <div className="password-match">Please Enter Correct BRP Number</div>
      );
    } else {
      setValidCnic(true);
      return <></>;
    }
  };
  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };
  const handleLoading = () => {
    setLoading(false);
  };

  const PhoneValidation = () => {
    let phoneNo = /^((\+44)?(0044)?(0)?)(7)(\d{9})$/;
    if (data.PhoneNo.match(phoneNo)) {
      setValidPhone(true);
      return <div></div>;
    } else {
      setValidPhone(false);
      return (
        <div className="password-match">Please Enter Correct Phone Number</div>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fromCity;
    let toCity;
    if (
      vehicle.vehicleType === "Small Truck" ||
      vehicle.vehicleType === "Heavy Truck"
    ) {
      fromCity = vehicle.fromCity;
      toCity = vehicle.toCity;
    } else {
      fromCity = data.FromCity;
      toCity = data.ToCity;
    }
    const payload = {
      user_id: user.id,
      name: data.Name,
      cnic: data.CNIC,
      phone_no: data.PhoneNo,
      fromCity: fromCity,
      toCity: toCity,
      vehicle_id: vehicle.id,
      vehicle_name: vehicle.name,
      booking_type: "vehicle",
      perDayPrice: vehicle.perDayPrice,
      numberPlate: vehicle.numberPlate,
      modelYear: vehicle.modelYear,
      address: data.Address,
      dateIn: data.DateIn.replaceAll("-", "/"),
      dateOut: data.DateOut.replaceAll("-", "/"),
      registeredOwner_id: vehicle.registeredOwner_id,
    };
    setLoading(true);
    dispatch(vehicleBookingRequest(payload, handleLoading));
  };

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <Card className={`aboutUSCard container-fluid`}>
      <CardTitle className="cardTitle">
        <div className="border-bottom mt-2 text-center">
          <h3 className="mb-2">Please Fill Booking Details </h3>
        </div>
      </CardTitle>
      <form onSubmit={(e) => handleSubmit(e)} className="row">
        <div className="col-md-6 form-group mb-3">
          <label className="label">Your Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={data.Name}
            onChange={(e) => handleData("Name", e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 form-group mb-3">
          <label className="label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="07XXXXXXXXX"
            value={data.PhoneNo}
            onChange={(e) => handleData("PhoneNo", e.target.value)}
            required
          />
          {!data.PhoneNo ? <></> : <PhoneValidation />}
        </div>

        <div className="col-md-6 form-group mb-3">
          <label className="label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            value={data.Address}
            onChange={(e) => handleData("Address", e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 form-group mb-3">
          <label className="label">BRP Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="BRP Number"
            value={data.CNIC}
            onChange={(e) => handleData("CNIC", e.target.value)}
            required
          />
          {!data.CNIC ? <></> : <CNICValidation />}
        </div>
        {vehicle.vehicleType === "Small Truck" ||
        vehicle.vehicleType === "Heavy Truck" ? (
          <>
            <div className="col-md-6 form-group mb-3">
              <label className="label">From City</label>
              <input
                type="text"
                className="form-control"
                placeholder="From City"
                value={vehicle.fromCity}
                onChange={(e) => handleData("FromCity", e.target.value)}
                disabled
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label className="label">To City</label>
              <input
                type="text"
                className="form-control"
                placeholder="To City"
                value={vehicle.toCity}
                onChange={(e) => handleData("ToCity", e.target.value)}
                disabled
              />
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="col-md-6 form-group mb-3">
              <label className="label">From City</label>
              <input
                type="text"
                className="form-control"
                placeholder="From City"
                value={data.FromCity}
                onChange={(e) => handleData("FromCity", e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label className="label">To City</label>
              <input
                type="text"
                className="form-control"
                placeholder="To City"
                value={data.ToCity}
                onChange={(e) => handleData("ToCity", e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className="col-md-6 form-group mb-3">
          <label className="label">Date In</label>
          <input
            type="date"
            className="form-control"
            placeholder="Date In"
            value={data.DateIn}
            min={disablePastDate()}
            onChange={(e) => handleData("DateIn", e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 form-group mb-3">
          <label className="label">Date Out</label>
          <input
            type="date"
            className="form-control"
            placeholder="Date Out"
            value={data.DateOut}
            min={disablePastDate()}
            onChange={(e) => handleData("DateOut", e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 mb-3 vehicleButton">
          {(!validCnic && data.CNIC != "") ||
          (!validPhone && data.PhoneNo != "") ? (
            <button type="submit" disabled className="signin-btn">
              Book Now
            </button>
          ) : (
            <button type="submit" className="signin-btn">
              Book Now
            </button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default VehicleBooking;
