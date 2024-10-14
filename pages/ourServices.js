import React from "react";
import { useState } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import Image from "next/image";
import carIcon from "../assets/images/sport-car.png";
import truckIcon from "../assets/images/d-truck.png";
import driverIcon from "../assets/images/Driver.png";
import dashboardIcon from "../assets/images/home.png";
import registerIcon from "../assets/images/plus.png";
import profileIcon from "../assets/images/driver-profile.png";

function OurServices() {
  return (
    <div className="ftco-section">
      <div className="container">
        <CardTitle className="border-bottom text-center mb-4 ">
          <h3 className="text-center mb-1 mt-2 pb-2 text-danger fw-bold">
            Our Services
          </h3>
          <p className="text-center text-muted">
            Our aim is to provide most amazing services to our users.
          </p>
        </CardTitle>
        <div className="row justify-content-center">
          <div className="row mt-2 text-center text-dark">
            <div className="col-md-4">
              <div className="servicesicon">
                <Image
                  src={truckIcon}
                  className="servicesiconImg mt-4"
                  alt="icon"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h5 className="font-weight-bold mt-4"> Cargo Shipment</h5>
                <p className="text-muted servicesPara">
                  We are providing full cargo shipment from different cities of
                  UK. You can easily book different types of trucks for your
                  cargo shipment.
                </p>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="servicesicon ">
                <Image
                  src={carIcon}
                  className="servicesiconImg mt-4"
                  alt="icon"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h5 className="font-weight-bold mt-4"> Book Vehicles</h5>
                <p className="text-muted servicesPara">
                  {" "}
                  All kind of vehicles for you. Book all kind of vehicles like
                  buses, cars and vans at offordable rates for your personal
                  uses.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="servicesicon">
                <Image
                  src={driverIcon}
                  className="servicesiconImg mt-4"
                  alt="icon"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h5 className="font-weight-bold mt-4">Book Drivers</h5>
                <p className="text-muted servicesPara">
                  If you have vehicle and need a driver we make it easy for you.
                  Book any type of driver easily in just few minutes.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="servicesicon">
                <Image
                  src={registerIcon}
                  className="servicesiconImg mt-2"
                  alt="icon"
                  width={80}
                  height={80}
                />
              </div>
              <div>
                <h5 className="font-weight-bold mt-4">
                  {" "}
                  Register Your Vehicles
                </h5>
                <p className="text-muted servicesPara">
                  {" "}
                  If you are a transporter and have vehicles, just create a
                  transporter account and register your vehicles so customers
                  can book your vehicle.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="servicesicon">
                <Image
                  src={profileIcon}
                  className="servicesiconImg mt-2"
                  alt="icon"
                  width={80}
                  height={80}
                />
              </div>
              <div>
                <h5 className="font-weight-bold mt-4">
                  {" "}
                  Register Driver Profile
                </h5>
                <p className="text-muted servicesPara">
                  {" "}
                  If you are a driver and wants work, just create your driver
                  profile and register yourself so that customers can book you.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="servicesicon">
                <Image
                  src={dashboardIcon}
                  className="servicesiconImg mt-4"
                  alt="icon"
                  width={80}
                  height={80}
                />
              </div>
              <div>
                <h5 className="font-weight-bold mt-4">Dashboard</h5>
                <p className="text-muted servicesPara">
                  {" "}
                  Every user will get his own dashboard where he can track his
                  booking resquests easily. Add or delete your vehicles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurServices;
