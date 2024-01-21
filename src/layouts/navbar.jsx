import React from "react";
import ConnectWallet from "./ConnectWallet";
import Notification from "./Notification";
import HeroSection from "./HeroSection";
import Swiper3DSection from "./Swiper3DSection";
import TopPlayer from "./TopPlayer";
import TournamentSection from "./TournamentSection";
import GameSection from "./GameSection";
import Footer from "./Footer";
const navbar = () => {
  return (
    <>
      {/* Preloader */}
      <div className="preloader">
        <div className="loader">
          <span />
        </div>
      </div >
      {/* cursor effect*/}
      < div className="cursor" />
      {/* Header area  */}

      <header className="header-section w-100" >
        <div className="py-sm-6 py-3 mx-xxl-20 mx-md-15 mx-3">
          <div className="d-flex align-items-center justify-content-between gap-xxl-10 gap-lg-8 w-100">
            <nav className="navbar-custom d-flex gap-lg-6 align-items-center flex-column flex-lg-row justify-content-start justify-content-lg-between w-100">
              <div className="top-bar w-100 d-flex align-items-center gap-lg-0 gap-6">
                <button className="navbar-toggle-btn d-block d-lg-none" type="button">
                  <span />
                  <span />
                  <span />
                  <span />
                </button>
                <a
                  className="navbar-brand d-flex align-items-center gap-4"
                  href="index.html"
                >
                  <img
                    className="w-100 logo1"
                    src="assets/img/favicon.png"
                    alt="favicon"
                  />
                  <img className="w-100 logo2" src="assets/img/logo.png" alt="logo" />
                </a>
              </div>
              <div className="navbar-toggle-item w-100 position-lg-relative">
                <ul
                  className="custom-nav gap-lg-7 gap-3 cursor-scale growDown2 ms-xxl-10"
                  data-lenis-prevent=""
                >
                  <li className="menu-link">
                    <a href="/">Home</a>
                  </li>
                  <li className="menu-item">
                    <button>Tournament</button>
                    <ul className="sub-menu">
                      <li className="menu-link">
                        <a href="tournaments.html">Tournaments</a>
                      </li>
                      <li className="menu-link">
                        <a href="tournaments-details.html">Tournaments Details</a>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-link">
                    <a href="game.html">Game</a>
                  </li>
                  <li className="menu-item">
                    <button>Teams</button>
                    <ul className="sub-menu">
                      <li className="menu-link">
                        <a href="teams.html">Teams</a>
                      </li>
                      <li className="menu-link">
                        <a href="teams-details.html">Teams Details</a>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item">
                    <button>pages</button>
                    <ul className="sub-menu">
                      <li className="menu-link">
                        <a href="signup.html">Sign Up</a>
                      </li>
                      <li className="menu-link">
                        <a href="signin.html">Sign In</a>
                      </li>
                      <li className="menu-link">
                        <a href="error.html">Error</a>
                      </li>
                      <li className="menu-link">
                        <a href="faq.html">Faq</a>
                      </li>
                      <li className="menu-link">
                        <a href="terms-condition.html">Terms Conditions</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="header-btn-area d-flex align-items-center gap-sm-6 gap-3">
              <button className="btn-rounded-cus wallet-btn border-0 d-flex align-items-center gap-3 p-xl-2 p-0 pe-xl-6 rounded-5 position-relative">
                <span className="btn-circle fs-2xl">
                  <i className="ti ti-wallet" />
                </span>
                <span className="text-nowrap d-none d-xl-block">Connect Wallet</span>
              </button>
              <button className="ntf-btn box-style fs-2xl">
                <i className="ti ti-bell-filled" />
              </button>
              <div className="header-profile pointer">
                <div className="profile-wrapper d-flex align-items-center gap-3">
                  <div className="img-area overflow-hidden">
                    <img
                      className="w-100"
                      src="assets/img/profile.png"
                      alt="profile"
                    />
                  </div>
                  <span className="user-name d-none d-xxl-block text-nowrap">
                    David Malan
                  </span>
                  <i className="ti ti-chevron-down d-none d-xxl-block" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Notification />
      <ConnectWallet />
      {/* user account details popup start  */}
      <>
        <div className="user-account-popup p-4">
          <div className="account-items d-grid gap-1" data-tilt="">
            <div className="user-level-area p-3">
              <div className="user-info d-between">
                <span className="user-name fs-five">David Malan</span>
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
            <button className="bttn account-item">Logout</button>
          </div>
        </div>
      </>
      {/* user account details popup end  */}
      <HeroSection />
      <Swiper3DSection />
      <TopPlayer />
      <TournamentSection />
      <GameSection />
      {/* <CallToAction /> */}
      <Footer />






    </>

  );
};
export default navbar;
