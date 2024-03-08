/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import ConnectWallet from "../layouts/ConnectWallet";
import Notification from "../layouts/Notification";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useAuth } from "../context/authContext";
import UserServices from "../services/UserServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [account, setAccount] = useState({});
  const history = useHistory();

  const { accountId, token } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("accountId");
    setIsLoggedIn(false);
    setUsername(null);
    window.location.reload();
    window.location.href = "/home";
  };

  const handleLogin = () => {
    history.push("/login");
  };
  useEffect(() => {
    UserServices.getInfoUser(accountId, token)
      .then((response) => {
        setAccount(response.data);
        console.log("Account info:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching account:", error);
      });
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accountId, token]);

  return (
    <>
      <div className="cursor" />

      <header className="header-section w-100">
        <div className="py-sm-6 py-3 mx-xxl-20 mx-md-15 mx-3">
          <div className="d-flex align-items-center justify-content-between gap-xxl-10 gap-lg-8 w-100">
            <nav className="navbar-custom d-flex gap-lg-6 align-items-center flex-column flex-lg-row justify-content-start justify-content-lg-between w-100">
              <div className="top-bar w-100 d-flex align-items-center gap-lg-0 gap-6">
                <button
                  className="navbar-toggle-btn d-block d-lg-none"
                  type="button"
                >
                  <span />
                  <span />
                  <span />
                  <span />
                </button>
                <Link
                  className="navbar-brand d-flex align-items-center gap-4"
                  to="/"
                >
                  <img
                    className="w-100 logo1"
                    src="../assets/img/favicon.png"
                    alt="favicon"
                  />
                  <img
                    className="w-100 logo2"
                    src="../assets/img/logo.png"
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="navbar-toggle-item w-100 position-lg-relative">
                <ul
                  className="custom-nav gap-lg-7 gap-3 cursor-scale growDown2 ms-xxl-10"
                  data-lenis-prevent=""
                >
                  <li className="menu-link">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="menu-item">
                    <button>Tournament</button>
                    <ul className="sub-menu">
                      <li className="menu-link">
                        <a href="tournaments.html">Tournaments</a>
                      </li>
                      <li className="menu-link">
                        <a href="tournaments-details.html">
                          Tournaments Details
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-link">
                    <Link to="/search">Game</Link>
                  </li>

                  {isLoggedIn ? (
                    <li className="menu-link">
                      <a onClick={handleLogout} type="button">
                        Log out
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </nav>
            <div className="header-btn-area d-flex align-items-center gap-sm-6 gap-3">
              <button className="btn-rounded-cus wallet-btn border-0 d-flex align-items-center gap-3 p-xl-2 p-0 pe-xl-6 rounded-5 position-relative">
                <span className="btn-circle fs-2xl">
                  <i className="ti ti-wallet" />
                </span>
                <span className="text-nowrap d-none d-xl-block">
                  Connect Wallet
                </span>
              </button>
              <button className="ntf-btn box-style fs-2xl">
                <i className="ti ti-bell-filled" />
              </button>
              {isLoggedIn ? (
                <div
                  className="header-profile pointer"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="profile-wrapper d-flex align-items-center gap-3">
                    <div className="img-area overflow-hidden">
                      <img
                        className="w-100"
                        src="assets/img/profile.png"
                        alt="profile"
                      />
                    </div>
                    {account && account.username && (
                      <span className="user-name d-none d-xxl-block text-nowrap">
                        {account.username}
                      </span>
                    )}
                    <i className="ti ti-chevron-down d-none d-xxl-block" />
                  </div>
                </div>
              ) : (
                <button
                  className="ntf-btn box-style fs-2xl"
                  onClick={handleLogin}
                >
                  <FontAwesomeIcon icon={faRightToBracket} />{" "}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <Notification />
      <ConnectWallet />

      {isLoggedIn && (
        <div className="user-account-popup p-4">
          <div className="account-items d-grid gap-1" data-tilt="">
            <div className="user-level-area p-3">
              <div className="user-info d-between">
                <span className="user-name fs-five">Trieu</span>
                <div className="badge d-flex align-items-center">
                  <i className="ti ti-medal fs-three fs-normal tcp-2" />
                  <i className="ti ti-medal fs-three fs-normal tcp-2" />
                  <i className="ti ti-medal fs-three fs-normal tcp-2" />
                </div>
              </div>
              <div className="user-level">
                <span className="level-title tcn-6">Level</span>
                <div className="level-bar my-1">
                  <div className="level-progress" style={{ width: "30%" }} />
                </div>
              </div>
            </div>
            <a href="profile.html" className="account-item">
              View Profile
            </a>
            <a href="chat.html" className="account-item">
              Message
            </a>

            {isLoggedIn ? (
              <button onClick={handleLogout} className="bttn account-item">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
