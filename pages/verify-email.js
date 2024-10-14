import React from "react";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from '../styles/Home.module.css'
import { useDispatch } from "react-redux";
import { errorNotification } from "../components/notification/notification";
import { verifyEmail } from "../redux/auth/auth.actions";
import { useRouter } from "next/router";
import emailpic from "../assets/images/emailverify.png"

const VerifyEmail = () => {

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router=useRouter();
  const token = router.query.token;
 
  const handleLoading = () => {
    setLoading(false);
  };

  const handleSubmit = () => {
    const payload = {
      token: token,
    };
    dispatch(verifyEmail(payload, handleLoading));
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <Image src={emailpic} alt="Truck Image" width={430} height={350}
          />
          <div className="text-center mb-4">
            <h5 className="text-danger fw"> We are excited to have you get started. First you need
            to confirm your account.</h5>
          </div>
          <div className="text-center">
          <button type="button" onClick={(e)=>handleSubmit()} className="verifyEmailBtn btn-danger btn">Verify Email</button>
          </div>
           
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
