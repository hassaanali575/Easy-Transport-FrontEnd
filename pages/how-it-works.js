import React from "react";
import { useState } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import Image from "next/image";
import image from "../assets/images/howitworks.png"

function HowItWorks() {
    return (

        <section className="how-it-works">
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

    );
}

export default HowItWorks;
