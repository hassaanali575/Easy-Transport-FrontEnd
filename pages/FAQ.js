import React from "react";
import { useState } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import Image from "next/image";

function FAQ() {
  return (
    <div className="ftco-section">
        <div className="container FAQCard">
        <CardTitle className="border-bottom text-center mb-4 ">     
          <h3 className="text-center mb-1 mt-2 pb-2 text-danger fw-bold">FAQs</h3>
          <p className="text-center">
            Find the answers for the most frequently asked questions below
          </p>
          </CardTitle>
          <div className="row text-center">
            <div className="col-md-6 col-lg-4 mb-4 ">
              <h6 className="mb-3 text-danger">
                <i className="bi bi-question-circle text-danger pe-2"></i> 
                Do I have to create a account?
              </h6>
              <p className="FAQSText">
                <strong>
                  <u>Absolutely!</u>
                </strong>{" "}
                You have to create a account to use our services. If you are a customer
                you need to create a account to book any vehicle or driver and if you are
                transporter or driver you need to create account to register your vehicle
                or driver profile.
              </p>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <h6 className="mb-3 text-danger">
                <i className="bi bi-question-circle text-danger pe-2"></i> What services will I get as Customer?
              </h6>
              <p className="FAQSText">
                <strong>
                  <u>1</u>
                </strong>{" "}
               You can book any type of truck for cargo shipment.
               <strong>
                  <u>2</u>
                </strong>{" "}
               You can book car, bus or van for personal uses.
               <strong>
                  <u>3</u>
                </strong>{" "}
               You can book any kind of driver if you have vehicle.
              </p>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <h6 className="mb-3 text-danger">
                <i className="bi bi-question-circle text-danger pe-2"></i> What services will I get as Transporter?
              </h6>
              <p className="FAQSText">
                If you are a transporter you can submit your vehicles like car, bus, van and trucks from your dashboard.
                Customers can book your vehicle and you will get notify.
              </p>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <h6 className="mb-3 text-danger">
                <i className="bi bi-question-circle text-danger pe-2"></i> What services will I get as Driver?
              </h6>
              <p className="FAQSText">
              If you are a driver you can create your driver profile through registration. Your profile will we visible to customers.
                Customers can book you and you will get notify.
              </p>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <h6 className="mb-3 text-danger">
                <i className="bi bi-question-circle text-danger pe-2"></i> How can I book vehicle or driver?
              </h6>
              <p className="FAQSText">
                <strong>
                  <u>Its very easy</u>.
                </strong>{" "}
               Just visit vehicle or driver page. Search vehicle or driver according to your need. Select vehicle or driver
               and check complete details. Fill booking form.
              </p>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <h6 className="mb-3 text-danger">
                <i className="bi bi-question-circle text-danger pe-2"></i> What is the payment procedure you are providing?
              </h6>
              <p className="FAQSText">
                Currently we are providing cash on door step. You will get services directly from transporter or driver
                and you will pay your charges directly to service owner.
              </p>
            </div>
          </div>
          </div>
    </div>
  );
}

export default FAQ;
