import React from "react";
import { useState, useEffect } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import DriverBooking from "../components/DriverBooking";
import {
  errorNotification,
  warningNotification,
  infoNotification,
} from "../components/notification/notification";
import { getDrivers } from "../redux/drivers/driver.actions";

function DriverDetails() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const driversResult = useSelector(({ drivers }) => drivers.driversResult);
  const user = useSelector(({ auth }) => auth.user);
  const router = useRouter();
  const driver = router.query;
  const driverID = driver.id;
  const [show, setShow] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [driverData, setDriverData] = useState({});
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
        "Please Login First to Book this Driver"
      );
    }
  };

  const handleLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (!driversResult) {
      const payload = {
        user_type: "Driver",
      };
      dispatch(getDrivers(payload, handleLoading));
    }
  }, [driversResult]);

  useEffect(() => {
    if (driversResult != null) {
      const newData = driversResult.filter((item) => {
        return item.id.includes(driverID);
      });
      setFilterData(newData);
    }
  }, [driversResult]);

  useEffect(() => {
    if (filterData.length > 0) {
      setDriverData(filterData[0]);
    }
  }, [filterData]);

  return (
    <div className="ftco-section">
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-3 justify-content-center  ">
            <Card className="effectCard">
              {driverData.photoUrl ? (
                <div>
                  <Image
                    src={driverData.photoUrl}
                    alt="hero banner"
                    className="productDetailsIMG"
                    width={600}
                    height={600}
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
                  <i className="bi bi-person me-2 " />
                  Driver Details
                </CardTitle>
                <CardBody>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Age</h6>
                    <p className="mb-0 text-muted">{driverData.age}</p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">City</h6>
                    <p className="mb-0 text-muted">{driverData.city}</p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Driving License</h6>
                    <p className="mb-0 text-muted">Yes</p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Driving Experience</h6>
                    <p className="mb-0 text-muted">
                      {driverData.drive_experience} Years
                    </p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Driving Type</h6>
                    <p className="mb-0 text-muted text-capitalize">
                      {driverData.driver_type}
                    </p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Per Day Charges</h6>
                    <p className="mb-0 text-muted">
                      GBP {driverData.perDayPrice}
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
              <DriverBooking driverDetails={driverData} />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DriverDetails;
