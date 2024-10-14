import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardTitle, CardBody } from "reactstrap";
import user from "../assets/images/hassan.jpg";

const AboutUs = () => {
  return (
    <section className="ftco-section">
      <div className="container-fluid">
        <CardTitle
          tag="h2"
          className="border-bottom p-3 mb-4 text-center text-muted "
        >
          <i className="bi bi-person-hearts me-2"></i>
          About Us
        </CardTitle>

        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-3">
            <Card className="aboutUSCard">
              <Image
                src={user}
                alt="hero banner"
                className="productsIMG"
                width={500}
                height={600}
              />

              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="small">
                    <a className="text-muted">Name</a>
                  </p>
                  <p className="small text-danger">Hassaan Ali</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="small">
                    <a className="text-muted">Email</a>
                  </p>
                  <p className="small text-danger">hassaan.ali33@law.ac.uk</p>
                </div>
                <div className="d-flex justify-content-between mb-0">
                  <p className="small">
                    <a className="text-muted mb-0">Profession</a>
                  </p>
                  <p className="small text-danger mb-0">Software Engineer</p>
                </div>
                <div className="d-flex justify-content-between mb-0">
                  <p className="small">
                    <a className="text-muted mb-0">Role</a>
                  </p>
                  <p className="small text-danger mb-0">Web Development</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
