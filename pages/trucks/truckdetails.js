import React from "react";
import { useState, useEffect } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  errorNotification,
  warningNotification,
  infoNotification,
} from "../../components/notification/notification";
import VehicleBooking from "../../components/VehicleBooking";
import {
  getUserSmTrucks,
  getUserLgTrucks,
} from "../../redux/vehicles/vehicles.actions";

function TruckDetails() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const user = useSelector(({ auth }) => auth.user);
  const userSmTrucks = useSelector(({ vehicles }) => vehicles.userSmTrucks);
  const userLgTrucks = useSelector(({ vehicles }) => vehicles.userLgTrucks);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const truck = router.query;
  const vehicleID = truck.id;
  const vehicleType = truck.type;
  const [filterData, setFilterData] = useState([]);
  const [truckData, setTruckData] = useState({});
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
    if (!userSmTrucks && !userLgTrucks) {
      if (vehicleType === "Small Truck") {
        const payload = {
          vehicleType: "Small Truck",
        };
        setLoading(true);
        dispatch(getUserSmTrucks(payload, handleLoading));
      } else if (vehicleType === "Heavy Truck") {
        const payload = {
          vehicleType: "Heavy Truck",
        };
        setLoading(true);
        dispatch(getUserLgTrucks(payload, handleLoading));
      }
    }
  }, [vehicleType, userSmTrucks, userLgTrucks]);

  useEffect(() => {
    let data;
    if (vehicleType === "Small Truck") {
      data = userSmTrucks;
    } else if (vehicleType === "Heavy Truck") {
      data = userLgTrucks;
    }
    if (data != null) {
      const newData = data.filter((item) => {
        return item.id.includes(vehicleID);
      });
      setFilterData(newData);
    }
  }, [userSmTrucks, userLgTrucks]);

  useEffect(() => {
    if (filterData.length > 0) {
      setTruckData(filterData[0]);
    }
  }, [filterData]);

  return (
    <div className="ftco-section">
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 justify-content-center  ">
            <Card className="effectCard">
              <div>
                {truckData.photoUrl ? (
                  <Image
                    src={truckData.photoUrl}
                    alt="hero banner"
                    className="productDetailsIMG"
                    width={500}
                    height={250}
                    layout="responsive"
                  />
                ) : (
                  <></>
                )}
              </div>
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
                      {truckData.name}
                    </p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Color</h6>
                    <p className="mb-0 text-muted text-capitalize">
                      {truckData.color}
                    </p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Model Year</h6>
                    <p className="mb-0 text-muted">{truckData.modelYear}</p>
                  </div>

                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Transmission Type</h6>
                    <p className="mb-0 text-muted">{truckData.transmission}</p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">From City</h6>
                    <p className="mb-0 text-muted">{truckData.fromCity}</p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">To City</h6>
                    <p className="mb-0 text-muted">{truckData.toCity}</p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Truck Capacity</h6>
                    <p className="mb-0 text-muted">
                      {truckData.luggageCapacity} KG
                    </p>
                  </div>
                  <div className="topBorder mb-3"></div>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="mb-0">Average Charges</h6>
                    <p className="mb-0 text-muted">
                      GBP {truckData.perDayPrice}
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
              <VehicleBooking vehicleDetails={truckData} />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TruckDetails;
