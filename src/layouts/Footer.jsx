import React from 'react'
import CallToAction from './CallToAction'

export default function Footer() {
    return (
        <>
            <CallToAction />
            <footer className="footer bgn-4 bt">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-3 col-sm-6 br py-lg-20 pt-sm-15 pt-10 footer-card-area">
                            <div className="py-lg-10">
                                <div className="footer-logo mb-8">
                                    <a href="#" className="d-grid gap-6">
                                        <div className="flogo-1">
                                            <img
                                                className="w-100"
                                                src="assets/img/logo2.png"
                                                alt="favicon"
                                            />
                                        </div>
                                        <div className="flogo-2">
                                            <img className="w-100" src="assets/img/logo.png" alt="logo" />
                                        </div>
                                    </a>
                                </div>
                                <div className="social-links">
                                    <ul className="d-flex align-items-center gap-3 flex-wrap">
                                        <li>
                                            <a href="#">
                                                <i className="ti ti-brand-facebook fs-2xl" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="ti ti-brand-twitter fs-2xl" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="ti ti-brand-youtube fs-2xl" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="ti ti-brand-linkedin fs-2xl" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="ti ti-brand-instagram fs-2xl" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 br br-res py-lg-20 pt-sm-15 pt-10 footer-card-area">
                            <div className="py-lg-10">
                                <h4 className="footer-title mb-8 title-anim">Quick Links</h4>
                                <ul className="footer-list d-grid gap-4">
                                    <li>
                                        <a
                                            href="tournaments.html"
                                            className="footer-link d-flex align-items-center tcn-6"
                                        >
                                            <i className="ti ti-chevron-right" /> Tournaments
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="game.html"
                                            className="footer-link d-flex align-items-center tcn-6"
                                        >
                                            {" "}
                                            <i className="ti ti-chevron-right" /> Games{" "}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="teams.html"
                                            className="footer-link d-flex align-items-center tcn-6"
                                        >
                                            {" "}
                                            <i className="ti ti-chevron-right" /> Teams
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="faq.html"
                                            className="footer-link d-flex align-items-center tcn-6"
                                        >
                                            {" "}
                                            <i className="ti ti-chevron-right" /> FAQ
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 br py-lg-20 pt-sm-15 pt-10 footer-card-area">
                            <div className="py-lg-10">
                                <h4 className="footer-title mb-8 title-anim">Explore</h4>
                                <ul className="footer-list d-grid gap-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="footer-link d-flex align-items-center tcn-6"
                                        >
                                            {" "}
                                            <i className="ti ti-chevron-right" /> Top Players
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="chat.html"
                                            className="footer-link d-flex align-items-center tcn-6"
                                        >
                                            {" "}
                                            <i className="ti ti-chevron-right" /> messages
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="profile.html"
                                            className="footer-link d-flex align-items-center tcn-6"
                                        >
                                            {" "}
                                            <i className="ti ti-chevron-right" /> Profile
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 py-lg-20 pt-sm-15 pt-10 footer-card-area">
                            <div className="py-lg-10">
                                <h4 className="footer-title mb-8 title-anim">Follow Us</h4>
                                <ul className="footer-list d-grid gap-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="footer-link d-flex align-items-center tcn-6"
                                        >
                                            {" "}
                                            <i className="ti ti-chevron-right" /> Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="footer-link d-flex align-items-center tcn-6"
                                        >
                                            {" "}
                                            <i className="ti ti-chevron-right" /> Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="footer-link d-flex align-items-center tcn-6"
                                        >
                                            {" "}
                                            <i className="ti ti-chevron-right" /> Twitter
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="footer-link d-flex align-items-center tcn-6"
                                        >
                                            {" "}
                                            <i className="ti ti-chevron-right" /> Linkedln
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-4 pt-lg-4 pt-8 justify-content-between g-2">
                        <div className="col-xxl-4 col-lg-6 order-last order-lg-first">
                            <span>
                                Copyright © <span className="currentYear" /> GamePlex | Designed by{" "}
                                <a href="https://themeforest.net/user/pixelaxis" className="tcp-1">
                                    Pixelaxis{" "}
                                </a>
                            </span>
                        </div>
                        <div className="col-xxl-3 col-lg-5">
                            <ul className="d-flex align-items-center gap-lg-10 gap-sm-6 gap-4">
                                <li>
                                    <a href="terms-condition.html">Terms &amp; Conditions</a>
                                </li>
                                <li>
                                    <a href="#">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-banner-img" id="faa">
                    <img className="w-100" src="assets/img/fbanner.png" alt="banner" />
                </div>
            </footer>
        </>

    )
}
