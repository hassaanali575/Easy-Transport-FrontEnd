import React, { useState, useEffect } from "react";
import FullLayout from "../../components/TransporterDashboard/components/Layout/FullLayout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  rejectVehicleBooking,
  releaseVehicle,
  transporterBookings,
} from "../../redux/transporter/transporter.actions";
import { updateBookingStatus } from "../../redux/transporter/transporter.actions";
import Page404Error from "../error/404page";

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const user = useSelector(({ auth }) => auth.user);

  console.log(user);

  const bookingsRequests = useSelector(
    ({ transporter }) => transporter.transporterBookings
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const handleLoading = () => {
    setLoading(false);
  };

  const getTransporterBookings = () => {
    const payload = {
      registeredOwner_id: user.id,
    };
    setLoading(true);
    dispatch(transporterBookings(payload, handleLoading));
  };

  useEffect(() => {
    if (user !== null) {
      getTransporterBookings();
    }
  }, [user]);

  useEffect(() => {
    if (bookingsRequests !== null) {
      setBookings(bookingsRequests);
    }
    if (isLoggedIn || !isLoggedIn) {
      setLoaded(true);
    }
  }, [bookingsRequests, isLoggedIn]);

  useEffect(() => {
    if (loaded) {
      if (!isLoggedIn) {
        router.push("/login");
      }
    }
  }, [isLoggedIn, loaded]);

  const handleAccept = (bookingid, vehicleid, ownerid, type) => {
    const payload = {
      booking_id: bookingid,
      vehicle_id: vehicleid,
      registeredOwner_id: ownerid,
      booking_type: type,
    };
    dispatch(updateBookingStatus(payload, handleLoading));
    setTimeout(() => {
      getTransporterBookings();
    }, 1000);
  };
  const handleReject = (bookingid, vehicleid, ownerid, type) => {
    const payload = {
      booking_id: bookingid,
      vehicle_id: vehicleid,
      registeredOwner_id: ownerid,
      booking_type: type,
    };
    dispatch(rejectVehicleBooking(payload, handleLoading));
    setTimeout(() => {
      getTransporterBookings();
    }, 1000);
  };
  const handleRelease = (bookingid, vehicleid, ownerid, type) => {
    const payload = {
      booking_id: bookingid,
      vehicle_id: vehicleid,
      registeredOwner_id: ownerid,
      booking_type: type,
    };
    dispatch(releaseVehicle(payload, handleLoading));
    setTimeout(() => {
      getTransporterBookings();
    }, 1000);
  };

  return (
    <div>
      <FullLayout>
        <div>
          <div className="col-md-12 col-lg-12">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Booking Requests</CardTitle>
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
                    {" "}
                    {bookings.length <= 0 ? (
                      <h6 className="text-center">No Bookings Available</h6>
                    ) : (
                      <div className="table-responsive scrollit">
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
                            {bookings.map((booking, index) => (
                              <tr key={index} className="border-top">
                                <td>
                                  <div className="d-flex align-items-center">
                                    {/* <Image
                                 src={user.photoUrl}
                                 className="rounded-circle"
                                 alt="avatar"
                                 width="70"
                                 height="70"
                               /> */}
                                    <div className="ms-2">
                                      <h6 className="mb-1 text-capitalize fontWeight">
                                        {booking.name}
                                      </h6>
                                      <h6 className="mb-1 fontWeight">
                                        {booking.cnic}
                                      </h6>
                                      <h6 className="mb-1 fontWeight">
                                        {booking.phone_no}
                                      </h6>
                                      <h6 className="mb-1 text-capitalize fontWeight ">
                                        {booking.address}
                                      </h6>
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <div className="ms-0">
                                    <h6 className="mb-1 text-capitalize fontWeight">
                                      {booking.vehicle_name}
                                    </h6>
                                    <h6 className="mb-1 text-uppercase fontWeight">
                                      {booking.numberPlate}
                                    </h6>
                                    <h6 className="mb-1 text-capitalize fontWeight">
                                      Model: {booking.modelYear}
                                    </h6>
                                  </div>
                                </td>

                                <td>
                                  <div className="ms-0">
                                    <h6 className="mb-1 text-capitalize fontWeight">
                                      Pickup City: {booking.fromCity}
                                    </h6>
                                    <h6 className="mb-1 text-capitalize fontWeight">
                                      Destination: {booking.toCity}
                                    </h6>
                                    <h6 className="mb-1 fontWeight">
                                      Date In: {booking.dateIn.split("T")[0]}
                                    </h6>
                                    <h6 className="mb-1 fontWeight">
                                      Date Out: {booking.dateOut.split("T")[0]}
                                    </h6>
                                    <h6 className="mb-1 fontWeight">
                                      Charges: GBP {booking.perDayPrice}
                                    </h6>
                                  </div>
                                </td>

                                <td>
                                  <div className="ms-0">
                                    {!booking.accepted &&
                                    !booking.is_Rejected ? (
                                      <>
                                        <div>
                                          <button
                                            type="button"
                                            className="btn-success tableButton"
                                            onClick={() =>
                                              handleAccept(
                                                booking.id,
                                                booking.vehicle_id,
                                                booking.registeredOwner_id,
                                                booking.booking_type
                                              )
                                            }
                                          >
                                            Accept
                                          </button>
                                        </div>
                                        <div className="mt-3">
                                          <button
                                            type="button"
                                            className="btn-danger tableButton"
                                            onClick={() =>
                                              handleReject(
                                                booking.id,
                                                booking.vehicle_id,
                                                booking.registeredOwner_id,
                                                booking.booking_type
                                              )
                                            }
                                          >
                                            Reject
                                          </button>
                                        </div>
                                      </>
                                    ) : !booking.is_Rejected ? (
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
                                        {!booking.is_Released ? (
                                          <div className="mt-3">
                                            <button
                                              type="button"
                                              className="btn-primary acceptedButton"
                                              onClick={() =>
                                                handleRelease(
                                                  booking.id,
                                                  booking.vehicle_id,
                                                  booking.registeredOwner_id,
                                                  booking.booking_type
                                                )
                                              }
                                            >
                                              Release Vehicle
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
                                      </>
                                    )}
                                  </div>
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
};
export default Home;
