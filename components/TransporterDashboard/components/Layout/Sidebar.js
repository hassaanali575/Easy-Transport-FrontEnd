import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { logOutRequest } from "../../../../redux/auth/auth.actions";
import styles from "../../styles/Transporter.module.css"

const navigation = [
  {
    title: "Dashboard",
    href: "/transporter/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Vehicles",
    href: "/transporter/vehicles",
    icon: "bi bi-truck",
  },
  {
    title: "Profile",
    href: "/transporter/profile",
    icon: "bi bi-person",
  },
  
];

const Sidebar = ({ showMobilemenu }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let curl = useRouter();
  const location = curl.pathname;
  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <h3>Easy Transport</h3>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link href={navi.href}>
                <a
                  className={
                    location === navi.href ? "text-danger nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </a>
              </Link>
            </NavItem>
          ))}
          <Button
            color="danger"
            className="mt-3"
            onClick={() => {
              setLoading(true);
              dispatch(logOutRequest(handleLoading));
            }}
          >
            Log Out
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
