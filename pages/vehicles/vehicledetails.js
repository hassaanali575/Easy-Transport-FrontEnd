import React from "react";
import { useState, useEffect } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  errorNotification,
  warningNotification,
  infoNotification,
} from "../../components/notification/notification";
import VehicleBooking from "../../components/VehicleBooking";
import {
  getUserCars,
  getUserBuses,
  getUserVans,
} from "../../redux/vehicles/vehicles.actions";

function VehicleDetails() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const user = useSelector(({ auth }) => auth.user);
  const userCars = useSelector(({ vehicles }) => vehicles.userCars);
  const userBuses = useSelector(({ vehicles }) => vehicles.userBuses);
  const userVans = useSelector(({ vehicles }) => vehicles.userVans);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const vehicle = router.query;
  const vehicleID = vehicle.id;
  const vehicleType = vehicle.type;
  const [filterData, setFilterData] = useState([]);
  const [vehicleData, setVehicleData] = useState({});

  const handleShow = () => {
    if (isLoggedIn && user.user_type === "Customer") {
      setShow(true);
    } else if (
      isLoggedIn &&
      (user.user_type === "Transporter" || user.user_type === "Driver")
    ) {
      infoNotification(
        "Information",
        `Bookings are not allowed on ${user.user_type} account`
      );
    } else {
      errorNotification(
        "Login First",
        "Please Login First to Book this Vehicle"
      );
    }
  };
  const handleLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (!userCars && !userBuses && !userVans) {
      if (vehicleType === "Car") {
        const payload = {
          vehicleType: "Car",
        };
        dispatch(getUserCars(payload, handleLoading));
      } else if (vehicleType === "Bus") {
        const payload = {
          vehicleType: "Bus",
        };
        dispatch(getUserBuses(payload, handleLoading));
      } else if (vehicleType === "Van") {
        const payload = {
          vehicleType: "Van",
        };
        dispatch(getUserVans(payload, handleLoading));
      }
    }
  }, [vehicleType, userCars, userBuses, userVans]);

  useEffect(() => {
    let data;
    if (vehicleType === "Car") {
      data = userCars;
    } else if (vehicleType === "Bus") {
      data = userBuses;
    } else if (vehicleType === "Van") {
      data = userVans;
    }
    if (data != null) {
      const newData = data.filter((item) => {
        return item.id.includes(vehicleID);
      });
      setFilterData(newData);
    }
  }, [userCars, userBuses, userVans]);

  useEffect(() => {
    if (filterData.length > 0) {
      setVehicleData(filterData[0]);
    }
  }, [filterData]);

  return (
    <div className="ftco-section">
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 justify-content-center  ">
            <Card className="effectCard">
              {vehicleData.photoUrl ? (
                <div>
                  <Image
                    src={vehicleData.photoUrl}
                    alt="Image"
                    className="productDetailsIMG"
                    width={500}
                    height={250}
                    layout="responsive"
                  />
                </div>
              ) : (
                <></>
              )}
            </Card>
          </div>
          {!show ? (
            <div className="col-md-6 col-lg-4">
              <Card className={`effectCard bg-white container-fluid`}>
                <CardTitle
                  tag="h6"
                  className="border-bottom p-3 mb-0 text-center "
                >
                  <i className="bi bi-truck me-2 " />
                  Vehicle Details
                </CardTitle>
                <CardBody>
                  <div className={`d-flex justify-content-between mb-3`}>
                    <h6 className="mb-0">Vehicle Name</h6>
                    <p className="mb-0 text-muted text-capitalize">
                      {vehicleData.name}
                    </p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Color</h6>
                    <p className="mb-0 text-muted text-capitalize">
                      {vehicleData.color}
                    </p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Model Year</h6>
                    <p className="mb-0 text-muted">{vehicleData.modelYear}</p>
                  </div>

                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Transmission Type</h6>
                    <p className="mb-0 text-muted">
                      {vehicleData.transmission}
                    </p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">City</h6>
                    <p className="mb-0 text-muted">{vehicleData.fromCity}</p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Per Day Charges</h6>
                    <p className="mb-0 text-muted">
                      GBP {vehicleData.perDayPrice}
                    </p>
                  </div>

                  <div className="topBorder mb-3 "></div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn-danger tableButton "
                      onClick={handleShow}
                    >
                      Book Now
                    </button>
                  </div>
                </CardBody>
              </Card>
            </div>
          ) : (
            <div className="col-md-6">
              {" "}
              <VehicleBooking vehicleDetails={vehicleData} />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleDetails;
