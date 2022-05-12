import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/Image/logo.png";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";

const Navbar = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});

  // get current user from the firebase:
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user?.uid);
        setUser(user);
      } else {
        setUser({});
      }
    });
  }, []);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav
      style={
        pathname.includes("blog") ? { display: "none" } : { display: "flex" }
      }
    >
      <div className="logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="link-container">
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to="/videos"
        >
          Videos
        </NavLink>
        {user.uid ? (
          <button onClick={handleLogOut} className="logout-button">
            LogOut
          </button>
        ) : (
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "link")}
            to="/login"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
