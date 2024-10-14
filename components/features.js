import React from "react";
import Link from "next/link";
import Image from "next/image";
import truckimg from "../assets/images/truck.png";
import carimg from "../assets/images/car.png";
import driverimg from "../assets/images/Driver.png";
import styles from "../styles/Home.module.css";
import Captain from "../assets/images/captain.jpg"
import TransporterPic from "../assets/images/transporter.jpg"
import image from "../assets/images/howitworks.png"

const Features = () => {
  return (
    <div>
      <div className={styles.featuresText}>
        <h1> Most Amazing Services We Offer</h1>
      </div>

      <div className="container">
        <div className={`${styles.features} row featuresDiv`}>
          <div className={`${styles.featuresdiv} col-md-6`}>
            <h1>
              Trucks for Cargo Shipment
              <br /> ----
            </h1>
            <h4>
              If you need any type of trucks for your cargo shipment you
              can find and book these trucks in just few easy steps. Just
              search and select the most suitable truck and book it.
            </h4>
            <div className="d-flex featuresBtn">
              <Link href="/trucks/smalltrucks" passHref>
                <button type="button" className="features-btn">
                  Book Truck
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <Image src={truckimg} alt="Truck Image" width={530} height={300} />
          </div>
        </div>

        <div className={`${styles.features} row`}>
          <div className="col-md-6">
            <Image src={carimg} alt="Car Image" width={700} height={340} />
          </div>
          <div className={`${styles.featuresdiv} col-md-6`}>
            <h1>
              Vehicles for Daily Uses
              <br /> ----
            </h1>
            <h4>
              Book all kind of vehicles like cars for daily uses, buses
              and vans for tour services and for others many functions.
              Just search and select the right one.
            </h4>
            <div className="d-flex featuresBtn">
              <Link href="/vehicles/cars" passHref>
                <button type="button" className="features-btn ">
                  Book Vehicle
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className={`${styles.features} row featuresDiv`}>
          <div className={`${styles.featuresdiv} col-md-6`}>
            <h1>
              All kind of Drivers
              <br /> ----
            </h1>
            <h4>
              If you have your vehicle and just need a driver than you
              can get your most suitable driver very easily. Just find
              and select your most suitable driver for booking.
            </h4>
            <div className="d-flex featuresBtn">
              <Link href="/drivers" passHref>
                <button type="button" className="features-btn">
                  Book Driver
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <Image src={driverimg} alt="Driver Image" width={500} height={400} />
          </div>
        </div>
      </div>

      <div className="container ">
        <div className="becomeDriver row">
          <div className="col-md-6 ">
            <Image
              src={Captain}
              alt="Captain"
              width={580}
              height={400}
            />
          </div>
          <div className="col-md-6 mt-4 text-center abc">
          <div className="col-md-10 text-center ">
            <h1>Become a captain, join our network.</h1>
            <h6>Create your driver account and register your driver profile with us. We
              will show your profile to our customers and you will get booking requests from
              our customers. Check your booking requests from your dashboard.
            </h6>
            <div>
              <Link href="/signup" passHref>
            <button type="button" className="btn-white btn-becomeDriver mt-4">Driver SignUp</button>
            </Link>
            </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container ">
        <div className="becomeDriver row featuresDiv">
          <div className="col-md-6 mt-4 text-center abc">
            <div className="col-md-10 text-center">
            <h1>Become a transporter, join our network.</h1>
            <h6>Create your transporter account. Visit your dashboard and register your
              all types of vehicles. Customers will book your vehicles and you will receive
              your booking requests on your dashboard.
            </h6>
            <div>
              <Link href="/signup" passHref>
            <button type="button" className="btn-white btn-becomeDriver mt-4">Transporter SignUp</button>
            </Link>
            </div>
            </div>
            
          </div>
          <div className="col-md-6 ">
            <Image
              src={TransporterPic}
              alt="Captain"
              width={580}
              height={350}
            />
          </div>
        </div>
      </div>

   <section className="how-it-works-home">
            <h2 className="section-heading text-center">How it works?</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <Image
                            src={image}
                            alt="Car Image"
                            width={340}
                            height={640}
                        />
                    </div>
                    <div className="col-md-6 how-it-works-details">
                        <div className="mb-3">
                            <div className="flexbox">
                            <div className="circle">01</div>
                            <div className="text-dark">
                            <h4>Registration</h4>
                            <h6 className="howitworksdec">If you are a customer, create a customer account. If you
                                are a transporter or driver, create a transporter or driver account. </h6>
                            </div>
                            </div>
                        </div>
                        <div className="mb-3">
                        <div className="flexbox">
                            <div className="circle">02</div>
                            <div className="text-dark">
                            <h4>Register Vehicles</h4>
                            <h6 className="howitworksdec">After creating transporter account,
                            Register your vehicles from the dashboard so that customers can book.</h6>
                            </div>
                            </div>
                        </div>
                        <div className="mb-3">
                        <div className="flexbox">
                            <div className="circle">03</div>
                            <div className="text-dark">
                            <h4>Book Vehicles or Driver</h4>
                            <h6 className="howitworksdec">Search trucks for cargo shipment or vehicles
                            according to your own choice. Fill booking details and the vehicle is booked.</h6>
                            </div>
                            </div>
                        </div>
                        <div className="mb-3">
                        <div className="flexbox">
                            <div className="circle">04</div>
                            <div className="text-dark">
                            <h4>Visit Dashboard</h4>
                            <h6 className="howitworksdec">Visit your dashboard to check the status of your
                            booking requests for all types of users like transporter, driver or customer. </h6>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


      <div className="container text-center mb-4">
        <div className={styles.featuresText}>
          <h1>A Right Place for Transporters and Drivers</h1>
          <h4>
            The most amazing features in this website are also for transporters
            and drivers.
          </h4>
        </div>

        <div className={`${styles.workfeatures} row`}>
          <div className={`${styles.workfeaturesdiv} col-md-4`}>
            <h1>1. Register and Make Profile</h1>
            <h4>
              Create a free account with few easy steps. Complete your profile
              by adding some personal information.{" "}
            </h4>
          </div>
          <div className={`${styles.workfeaturesdiv} col-md-4`}>
            <h1>2. Add Your Vehicles or Driver</h1>
            <h4>
              If you are a transporter, from dashboard add your vehicles. If you
              are a driver, from dashboard add your driver profile.{" "}
            </h4>
          </div>
          <div className={`${styles.workfeaturesdiv} col-md-4`}>
            <h1>3. Customers Search and Book</h1>
            <h4>
              Customers will search vehicles and drivers according to their
              needs and select most suitable vehicle or driver for booking.{" "}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
