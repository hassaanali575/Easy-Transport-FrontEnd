import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardTitle, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import driver1 from "../assets/images/drivers/d2.jpg";
import { getDrivers } from "../redux/drivers/driver.actions";

const Drivers = () => {
  const dispatch = useDispatch();
  const driversResult = useSelector(({ drivers }) => drivers.driversResult);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [filterData1, setFilterData1] = useState([]);
  const [searchData, setSearchData] = useState({
    city: "London",
    driverType: "Car",
    matchStatus: false,
  });
  const handleLoading = () => {
    setLoading(false);
  };

  const handleData = (key, value) => {
    setSearchData({ ...searchData, [key]: value });
  };
  useEffect(() => {
    const payload = {
      user_type: "Driver",
    };
    setLoading(true);
    dispatch(getDrivers(payload, handleLoading));
  }, []);

  useEffect(() => {
    if (driversResult != null) {
      const newData = driversResult.filter((item) => {
        const bookingStatus = item.booked.toString().toUpperCase();
        const matchStatus = searchData.matchStatus.toString().toUpperCase();
        return bookingStatus.includes(matchStatus);
      });
      setFilterData(newData);
      setFilterData1(newData);
    }
  }, [driversResult]);

  const filterDataFunction = () => {
    const newData = filterData1.filter((item) => {
      const city = item.city.toUpperCase();
      const drivertype = item.driver_type.toUpperCase();
      const matchCity = searchData.city.toUpperCase();
      const matchType = searchData.driverType.toUpperCase();
      return city.includes(matchCity) && drivertype.includes(matchType);
    });
    setFilterData(newData);
  };
  return (
    <section className="ftco-section">
      <div className="container-fluid customFluid">
        <CardTitle tag="h6" className="p-2 mb-4 container text-center">
          <div className="row justify-content-center">
            <div className="col-md-3 form-group mb-3">
              <label className="label text-danger mb-1">Select City</label>
              <select
                id="selectCity"
                className={`searchCard form-control  `}
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
            <div className="col-md-3 form-group mb-3">
              <label className="label text-danger mb-1">
                Select Driver Type
              </label>
              <select
                id="driverType"
                className={`searchCard form-control `}
                onChange={(e) => handleData("driverType", e.target.value)}
              >
                <option value="Car">Car</option>
                <option value="Bus">Bus</option>
                <option value="Van">Van</option>
                <option value="Small Truck">Small Truck</option>
                <option value="Heavy Truck">Heavy Truck</option>
              </select>
            </div>
            <div className="col-md-3 form-group searchButton">
              <button
                onClick={filterDataFunction}
                type="submit"
                className="signin-btn"
              >
                Search
              </button>
            </div>
          </div>
        </CardTitle>
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
        ) : filterData.length <= 0 ? (
          <div className="noData">
            <h6 className="GradientBorder">No Drivers Available</h6>
          </div>
        ) : (
          <div className="row">
            {filterData.map((driver, key) => (
              <>
                <Link
                  href={{
                    pathname: "/driver-details",
                    query: { id: driver.id },
                  }}
                  passHref
                >
                  <div className="col-md-6 col-lg-3">
                    <Card className="effectCard">
                      <Image
                        src={driver.photoUrl}
                        alt="hero banner"
                        className="productsIMG"
                        width={500}
                        height={500}
                        layout="responsive"
                      />

                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                          <h6 className="mb-0">City</h6>
                          <p className="mb-0 text-capitalize text-muted">
                            {driver.city}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <h6 className="mb-0">Driver Type</h6>
                          <p className="mb-0 text-capitalize text-muted">
                            {driver.driver_type}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <h6 className="mb-0">Driving Experience</h6>
                          <p className="mb-0 text-capitalize text-muted">
                            {driver.drive_experience} Years
                          </p>
                        </div>
                        <div className="topBorder mb-3"></div>
                        <div className="d-flex justify-content-between">
                          <h6 className="mb-0">Per Day Charges</h6>
                          <h6 className="text-danger mb-0">
                            GBP {driver.perDayPrice}
                          </h6>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Link>
              </>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Drivers;
