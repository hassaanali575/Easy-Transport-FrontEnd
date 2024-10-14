import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Page404Error from "./error/404page";
const Dashboard = () => {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const user = useSelector(({ auth }) => auth.user);
  const router = useRouter();

  useEffect(() => {
    isLoggedIn && user.user_type === "Driver"
      ? router.push("/driver/dashboard")
      : isLoggedIn && user.user_type === "Customer"
      ? router.push("/user/dashboard")
      : isLoggedIn && user.user_type === "Transporter"
      ? router.push("/transporter/dashboard")
      : router.push("/login");
  }, []);

  return <div></div>;
};

export default Dashboard;
