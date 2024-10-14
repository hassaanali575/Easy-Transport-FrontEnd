import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardTitle, CardBody } from "reactstrap";
import { loginRequest } from "../../redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { getUserLgTrucks } from "../../redux/vehicles/vehicles.actions";
import carimg from "../../assets/images/truck.png";

const HeavyTrucks = () => {
  const dispatch = useDispatch();
  const userTrucks = useSelector(({ vehicles }) => vehicles.userLgTrucks);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [filterData1, setFilterData1] = useState([]);
  const [searchData, setSearchData] = useState({
    fromCity: "London",
    toCity: "Birmingham",
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
      vehicleType: "Heavy Truck",
    };
    setLoading(true);
    dispatch(getUserLgTrucks(payload, handleLoading));
  }, []);

  useEffect(() => {
    if (userTrucks != null) {
      const newData = userTrucks.filter((item) => {
        const bookingStatus = item.booked.toString().toUpperCase();
        const matchStatus = searchData.matchStatus.toString().toUpperCase();
        return bookingStatus.includes(matchStatus);
      });
      setFilterData(newData);
      setFilterData1(newData);
    }
  }, [userTrucks]);

  const filterDataFunction = () => {
    const newData = filterData1.filter((item) => {
      const fromCity = item.fromCity.toUpperCase();
      const toCity = item.toCity.toUpperCase();
      const matchFromCity = searchData.fromCity.toUpperCase();
      const matchToCity = searchData.toCity.toUpperCase();
      return fromCity.includes(matchFromCity) && toCity.includes(matchToCity);
    });
    setFilterData(newData);
  };

  return (
    <section className="ftco-section">
      <div className="container-fluid customFluid">
        <CardTitle tag="h6" className="p-2 mb-5 container text-center">
          <div className="row justify-content-center">
            <div className="col-md-3 form-group mb-3">
              <label className="label text-danger mb-1">
                Select Pickup City
              </label>
              <select
                id="selectCity"
                className={`searchCard form-control  `}
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
            <div className="col-md-3 form-group mb-3">
              <label className="label text-danger mb-1">
                Select Destination City
              </label>
              <select
                id="selectCity"
                className={`searchCard form-control  `}
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
            <h6 className="GradientBorder">No Trucks Available</h6>
          </div>
        ) : (
          <div className="row">
            {filterData !== null ? (
              filterData.map((truck, key) => (
                <>
                  <Link
                    href={{
                      pathname: "/trucks/truckdetails",
                      query: { id: truck.id, type: truck.vehicleType },
                    }}
                    passHref
                  >
                    <div className="col-md-6 col-lg-3">
                      <Card className="effectCard">
                        <Image
                          src={truck.photoUrl}
                          alt="hero banner"
                          className="productsIMG"
                          width={500}
                          height={250}
                          layout="responsive"
                        />
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-0">Vehicle Name</h6>
                            <p className="mb-0 text-muted text-capitalize">
                              {truck.name}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-0">Model Year</h6>
                            <p className="text-muted mb-0">{truck.modelYear}</p>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-0">From City</h6>
                            <p className="text-muted mb-0">{truck.fromCity}</p>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-0">To City</h6>
                            <p className="text-muted mb-0">{truck.toCity}</p>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-0">Truck Capacity</h6>
                            <p className="text-muted mb-0">
                              {truck.luggageCapacity} KG
                            </p>
                          </div>
                          <div className="topBorder mb-3"></div>
                          <div className="d-flex justify-content-between">
                            <h6 className="mb-0">Average Charges</h6>
                            <h6 className="text-danger mb-0">
                              GBP {truck.perDayPrice}
                            </h6>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </Link>
                </>
              ))
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeavyTrucks;
