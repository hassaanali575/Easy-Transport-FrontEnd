import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardTitle, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserCars } from "../../redux/vehicles/vehicles.actions";

const Cars = () => {
  const dispatch = useDispatch();
  const userCars = useSelector(({ vehicles }) => vehicles.userCars);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [filterData1, setFilterData1] = useState([]);
  const [searchData, setSearchData] = useState({
    city: "London",
    transmission: "Auto",
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
      vehicleType: "Car",
    };
    setLoading(true);
    dispatch(getUserCars(payload, handleLoading));
  }, []);

  useEffect(() => {
    if (userCars != null) {
      const newData = userCars.filter((item) => {
        const bookingStatus = item.booked.toString().toUpperCase();
        const matchStatus = searchData.matchStatus.toString().toUpperCase();
        return bookingStatus.includes(matchStatus);
      });
      setFilterData(newData);
      setFilterData1(newData);
    }
  }, [userCars]);

  const filterDataFunction = () => {
    const newData = filterData1.filter((item) => {
      const city = item.fromCity.toUpperCase();
      const transmission = item.transmission.toUpperCase();
      const matchCity = searchData.city.toUpperCase();
      const matchTransmission = searchData.transmission.toUpperCase();
      return (
        city.includes(matchCity) && transmission.includes(matchTransmission)
      );
    });
    setFilterData(newData);
  };

  return (
    <section className="ftco-section">
      <div className="container-fluid customFluid">
        <CardTitle tag="h6" className="p-2 mb-5 container text-center">
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
                Select Transmission Type
              </label>
              <select
                id="transmissionType"
                className={`searchCard form-control `}
                onChange={(e) => handleData("transmission", e.target.value)}
              >
                <option value="Auto">Auto</option>
                <option value="Manual">Manual</option>
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
            <h6 className="GradientBorder">No Vehicles Available</h6>
          </div>
        ) : (
          <>
            {" "}
            <div className="row">
              {filterData.map((car, key) => (
                <>
                  <Link
                    href={{
                      pathname: "/vehicles/vehicledetails",
                      query: { id: car.id, type: car.vehicleType },
                    }}
                    passHref
                  >
                    <div className="col-md-6 col-lg-3">
                      <Card className="effectCard">
                        <Image
                          src={car.photoUrl}
                          alt="Car Image"
                          className="productsIMG"
                          width={500}
                          height={250}
                          layout="responsive"
                        />
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-0">Vehicle Name</h6>
                            <p className="mb-0 text-capitalize text-muted">
                              {car.name}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-0">Color</h6>
                            <p className="text-capitalize mb-0 text-muted">
                              {car.color}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-0">Model Year</h6>
                            <p className="text-muted mb-0">{car.modelYear}</p>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-0">Transmission</h6>
                            <p className="text-muted mb-0">
                              {car.transmission}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-0">City</h6>
                            <p className="text-muted mb-0">{car.fromCity}</p>
                          </div>
                          <div className="topBorder mb-3"></div>
                          <div className="d-flex justify-content-between">
                            <h6 className="mb-0">Per Day Charges</h6>
                            <h6 className="text-danger mb-0">
                              GBP {car.perDayPrice}
                            </h6>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </Link>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cars;
