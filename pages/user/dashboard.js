import React, { useState, useEffect } from "react";
import Head from "next/head";
import FullLayout from "../../components/UserDashboard/components/Layout/FullLayout";
import Image from "next/image";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../redux/vehicles/vehicles.actions";
import {
  getUserVehicleBookings,
  cancelVehicleBooking,
} from "../../redux/vehicles/vehicles.actions";
import { cancelDriverBooking } from "../../redux/drivers/driver.actions";
import Page404Error from "../error/404page";

export default function Home() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const user = useSelector(({ auth }) => auth.user);
  const userBookingsDriver = useSelector(
    ({ vehicles }) => vehicles.userBookings
  );
  const userBookingsVehicle = useSelector(
    ({ vehicles }) => vehicles.userVehicleBookings
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [bookingsDriver, setBookingsDriver] = useState([]);
  const [bookingsVehicle, setBookingsVehicle] = useState([]);
  const handleLoading = () => {
    setLoading(false);
  };

  const getVehicleBookings = () => {
    const vehiclePayload = {
      user_id: user.id,
      booking_type: "vehicle",
    };
    setLoading(true);
    dispatch(getUserVehicleBookings(vehiclePayload, handleLoading));
  };
  const getDriverBookings = () => {
    const payload = {
      user_id: user.id,
      booking_type: "driver",
    };
    setLoading(true);
    dispatch(getUserBookings(payload, handleLoading));
  };
  useEffect(() => {
    if (user !== null) {
      getVehicleBookings();
      getDriverBookings();
    }
  }, [user]);

  useEffect(() => {
    if (userBookingsDriver !== null) {
      setBookingsDriver(userBookingsDriver);
    }
    if (userBookingsVehicle !== null) {
      setBookingsVehicle(userBookingsVehicle);
    }
    if (isLoggedIn || !isLoggedIn) {
      setLoaded(true);
    }
  }, [userBookingsDriver, userBookingsVehicle, isLoggedIn]);

  useEffect(() => {
    if (loaded) {
      if (!isLoggedIn) {
        router.push("/login");
      }
    }
  }, [isLoggedIn, loaded]);

  const handleVehicleCancel = (bookingid, type) => {
    const payload = {
      booking_id: bookingid,
      booking_type: type,
    };
    dispatch(cancelVehicleBooking(payload, handleLoading));
    setTimeout(() => {
      getVehicleBookings();
    }, 1000);
  };
  const handleDriverCancel = (bookingid, type) => {
    const payload = {
      booking_id: bookingid,
      booking_type: type,
    };
    dispatch(cancelDriverBooking(payload, handleLoading));
    setTimeout(() => {
      getDriverBookings();
    }, 1000);
  };

  return (
    <div>
      <FullLayout>
        <div>
          <div className="col-md-12 col-lg-12">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Vehicle Booking Requests</CardTitle>
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
                  <>
                    {bookingsVehicle.length <= 0 ? (
                      <h6 className="text-center">No Bookings Available</h6>
                    ) : (
                      <div className="table-responsive userScrollit">
                        <Table
                          className="text-nowrap mt-3 align-middle"
                          borderless
                        >
                          <thead>
                            <tr>
                              <th>Customer Details</th>
                              <th>Vehicle Details</th>
                              <th>Booking Details</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {bookingsVehicle.map((vBooking, index) => (
                              <tr key={index} className="border-top">
                                <td>
                                  <div className="d-flex align-items-center p-2">
                                    <div className="ms-2">
                                      <h6 className="mb-1  text-capitalize fontWeight">
                                        {vBooking.name}
                                      </h6>
                                      <h6 className="mb-1  fontWeight">
                                        {vBooking.cnic}
                                      </h6>
                                      <h6 className="mb-1  fontWeight">
                                        {vBooking.phone_no}
                                      </h6>
                                      <h6 className="mb-1  text-capitalize fontWeight ">
                                        {vBooking.address}
                                      </h6>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="ms-0">
                                    <h6 className="mb-1  text-capitalize fontWeight">
                                      {vBooking.vehicle_name}
                                    </h6>
                                    <h6 className="mb-1 text-uppercase fontWeight">
                                      {vBooking.numberPlate}
                                    </h6>
                                    <h6 className="mb-1  fontWeight">
                                      {vBooking.modelYear}
                                    </h6>
                                  </div>
                                </td>

                                <td>
                                  <div className="ms-0">
                                    <h6 className="mb-1  text-capitalize fontWeight">
                                      Pickup City: {vBooking.fromCity}
                                    </h6>
                                    <h6 className="mb-1  text-capitalize fontWeight">
                                      Destination: {vBooking.toCity}
                                    </h6>
                                    <h6 className="mb-1  fontWeight">
                                      Date In: {vBooking.dateIn.split("T")[0]}
                                    </h6>
                                    <h6 className="mb-1  fontWeight">
                                      Date Out: {vBooking.dateOut.split("T")[0]}
                                    </h6>
                                    <h6 className="mb-1 fontWeight">
                                      Charges: GBP {vBooking.perDayPrice}
                                    </h6>
                                  </div>
                                </td>

                                <td>
                                  {!vBooking.accepted &&
                                  !vBooking.is_Rejected ? (
                                    <button
                                      type="button"
                                      className="btn-danger tableButton"
                                      onClick={() =>
                                        handleVehicleCancel(
                                          vBooking.id,
                                          vBooking.booking_type
                                        )
                                      }
                                    >
                                      Cancel
                                    </button>
                                  ) : !vBooking.is_Rejected ? (
                                    <>
                                      <div>
                                        <button
                                          type="button"
                                          className="btn-success acceptedButton"
                                          disabled
                                        >
                                          Booking Accepted
                                        </button>
                                      </div>
                                      {!vBooking.is_Released ? (
                                        <div className="mt-3">
                                          <button
                                            type="button"
                                            className="btn-primary acceptedButton"
                                            disabled
                                          >
                                            Pending Vehicle
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-3">
                                          <button
                                            type="button"
                                            className="btn-success acceptedButton"
                                            disabled
                                          >
                                            Vehicle Released
                                          </button>
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <div>
                                        <button
                                          type="button"
                                          className="btn-secondary acceptedButton"
                                          disabled
                                        >
                                          Booking Rejected
                                        </button>
                                      </div>
                                      <div className="mt-3">
                                        <button
                                          type="button"
                                          className="btn-danger acceptedButton"
                                          onClick={() =>
                                            handleVehicleCancel(
                                              vBooking.id,
                                              vBooking.booking_type
                                            )
                                          }
                                        >
                                          Delete Booking
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </>
                )}
              </CardBody>
            </Card>
          </div>
          <div className="col-md-12 col-lg-12">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Driving Booking Requests</CardTitle>
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
                  <>
                    {bookingsDriver.length <= 0 ? (
                      <h6 className="text-center">No Bookings Available</h6>
                    ) : (
                      <div className="table-responsive userScrollit">
                        <Table
                          className="text-nowrap mt-3 align-middle"
                          borderless
                        >
                          <thead>
                            <tr>
                              <th>Customer Details</th>
                              <th>Driver Details</th>
                              <th>Booking Details</th>
                              <th>Cancel Booking</th>
                            </tr>
                          </thead>

                          <tbody>
                            {bookingsDriver.map((dBooking, index) => (
                              <tr key={index} className="border-top">
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="ms-2">
                                      <h6 className="mb-1  text-capitalize fontWeight">
                                        {dBooking.name}
                                      </h6>
                                      <h6 className="mb-1  fontWeight">
                                        {dBooking.cnic}
                                      </h6>
                                      <h6 className="mb-1  fontWeight">
                                        {dBooking.phone_no}
                                      </h6>
                                      <h6 className="mb-1  text-capitalize fontWeight ">
                                        {dBooking.address}
                                      </h6>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="ms-0">
                                    <h6 className="mb-1  text-capitalize fontWeight">
                                      {dBooking.driver_name}
                                    </h6>
                                    <h6 className="mb-1  fontWeight">
                                      Age: {dBooking.age}
                                    </h6>
                                    <h6 className="mb-1  fontWeight">
                                      Experience: {dBooking.experience}
                                    </h6>
                                  </div>
                                </td>

                                <td>
                                  <div className="ms-0">
                                    <h6 className="mb-1  text-capitalize fontWeight">
                                      Pickup City: {dBooking.fromCity}
                                    </h6>
                                    <h6 className="mb-1  text-capitalize fontWeight">
                                      Destination: {dBooking.toCity}
                                    </h6>
                                    <h6 className="mb-1  fontWeight">
                                      Date In: {dBooking.dateIn.split("T")[0]}
                                    </h6>
                                    <h6 className="mb-1  fontWeight">
                                      Date Out: {dBooking.dateOut.split("T")[0]}
                                    </h6>
                                    <h6 className="mb-1 fontWeight">
                                      Charges: GBP {dBooking.perDayPrice}
                                    </h6>
                                  </div>
                                </td>

                                <td>
                                  {!dBooking.accepted &&
                                  !dBooking.is_Rejected ? (
                                    <button
                                      type="button"
                                      className="btn-danger tableButton"
                                      onClick={() =>
                                        handleDriverCancel(
                                          dBooking.id,
                                          dBooking.booking_type
                                        )
                                      }
                                    >
                                      Cancel
                                    </button>
                                  ) : !dBooking.is_Rejected ? (
                                    <>
                                      <div>
                                        <button
                                          type="button"
                                          className="btn-success acceptedButton"
                                          disabled
                                        >
                                          Booking Accepted
                                        </button>
                                      </div>
                                      {!dBooking.is_Released ? (
                                        <div className="mt-3">
                                          <button
                                            type="button"
                                            className="btn-primary acceptedButton"
                                            disabled
                                          >
                                            Pending Driver
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-3">
                                          <button
                                            type="button"
                                            className="btn-success acceptedButton"
                                            disabled
                                          >
                                            Driver Released
                                          </button>
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <div>
                                        <button
                                          type="button"
                                          className="btn-secondary acceptedButton"
                                          disabled
                                        >
                                          Booking Rejected
                                        </button>
                                      </div>
                                      <div className="mt-3">
                                        <button
                                          type="button"
                                          className="btn-danger acceptedButton"
                                          onClick={() =>
                                            handleDriverCancel(
                                              dBooking.id,
                                              dBooking.booking_type
                                            )
                                          }
                                        >
                                          Delete Booking
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </FullLayout>
    </div>
  );
}
