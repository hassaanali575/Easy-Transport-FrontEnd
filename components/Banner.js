import React from "react";
import Link from "next/link";
import Image from "next/image";
import bannerimg from "../assets/images/banner.jpg";
import phonebanner from "../assets/images/androidBanner.jpg";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
const Banner = () => {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const user = useSelector(({ auth }) => auth.user);

  return (
    <div>
      <div className="d-none d-sm-block d-sm-none d-md-block">
        <div className={`${styles.Banner}`}>
          <Image
            src={bannerimg}
            alt="hero banner"
            width={800}
            height={300}
            layout="responsive"
          />
        </div>
        <div className={`${styles.bannerdiv}`}>
          <h1>Make Your Transport Life Easy</h1>
          <h4 className="col-md-5 col-7">
            Book all kind of trucks for your cargo shipment. Book vehicles like
            cars, buses and vans for daily uses. Book all kind of drivers easily
            in just few minutes.
          </h4>
          {isLoggedIn ? (
            <Link href="/dashboard" passHref>
              <button
                type="button"
                className="btn-white btn-outline-white-banner mt-4"
              >
                Get Started
              </button>
            </Link>
          ) : (
            <Link href="/login" passHref>
              <button
                type="button"
                className="btn-white btn-outline-white-banner mt-4"
              >
                Get Started
              </button>
            </Link>
          )}
          <Link href="/ourServices" passHref>
            <button
              type="button"
              className="btn-white btn-outline-white-banner1 mt-4 px-10"
              style={{ width: "130px" }}
            >
              Our Services
            </button>
          </Link>
        </div>
      </div>
      <div
        className={`${styles.mobileBanner} mt-5 d-lg-none d-xl-block d-md-none d-lg-block d-xl-none`}
      >
        <Image
          src={phonebanner}
          alt="hero banner"
          width={300}
          height={550}
          layout="responsive"
        />
        <div className={`${styles.mobilebanner}`}>
          <h1>Make Your Transport Life Easy</h1>
          <h4>
            Book all kind of trucks for your cargo shipment. Book vehicles like
            cars, buses and vans for daily uses. Book all kind of drivers easily
            in just few minutes.
          </h4>
          {isLoggedIn ? (
            <Link href="/dashboard" passHref>
              <button
                type="button"
                className="btn-white btn-outline-white-banner mt-4"
              >
                Get Started
              </button>
            </Link>
          ) : (
            <Link href="/login" passHref>
              <button
                type="button"
                className="btn-white btn-outline-white-banner mt-4"
              >
                Get Started
              </button>
            </Link>
          )}
          <Link href="/ourServices" passHref>
            <button
              type="button"
              className="btn-white btn-outline-white-banner1 mt-4 ms-2"
              style={{ width: "130px" }}
            >
              Our Services
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
