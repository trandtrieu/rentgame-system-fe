import React from 'react'

export default function TournamentSection() {
    return (
        <section className="tournament-section pb-120" id="tournament-hero">
            {/* Diamond animation */}
            <div className="diamond-area">
                <img className="w-100" src="assets/img/diamond.png" alt="diamond" />
            </div>
            {/* game console animation */}
            <div className="game-console-area">
                <img
                    className="w-100"
                    src="assets/img/game-console2.png"
                    alt="game-console"
                />
            </div>
            <div className="red-ball top-50" />
            <div className="tournament-wrapper">
                <div className="tournament-wrapper-border">
                    <div className="container pt-120 pb-120">
                        <div className="row justify-content-between align-items-center gy-sm-0 gy-4 mb-15">
                            <div className="col-md-6 col-sm-8">
                                <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
                                    Tournaments
                                </h2>
                            </div>
                            <div className="col-md-6 col-sm-4 text-sm-end">
                                <a
                                    href="tournaments.html"
                                    className="btn-half-border position-relative d-inline-block py-2 px-6 bgp-1 rounded-pill"
                                >
                                    View More
                                </a>
                            </div>
                        </div>
                        <div className="row justify-content-between align-items-center g-6">
                            <div className="col-xl-4 col-md-6">
                                <div className="tournament-card p-xl-4 p-3 bgn-4">
                                    <div className="tournament-img mb-8 position-relative">
                                        <div className="img-area overflow-hidden">
                                            <img
                                                className="w-100"
                                                src="assets/img/tournament1.png"
                                                alt="tournament"
                                            />
                                        </div>
                                        <span className="card-status position-absolute start-0 py-2 px-6 tcn-1 fs-sm">
                                            <span className="dot-icon alt-icon ps-3">Playing</span>
                                        </span>
                                    </div>
                                    <div className="tournament-content px-xl-4 px-sm-2">
                                        <div className="tournament-info mb-5">
                                            <a href="tournaments-details.html" className="d-block">
                                                <h4 className="tournament-title tcn-1 mb-1 cursor-scale growDown title-anim">
                                                    Azariaria's Battlegrounds
                                                </h4>
                                            </a>
                                            <span className="tcn-6 fs-sm">Torneo Individual</span>
                                        </div>
                                        <div className="hr-line line3" />
                                        <div className="card-info d-flex align-items-center gap-3 flex-wrap my-5">
                                            <div className="price-money bgn-3 d-flex align-items-center gap-3 py-2 px-3 h-100">
                                                <div className="d-flex align-items-center gap-2">
                                                    <img
                                                        className="w-100"
                                                        src="assets/img/bitcoin.png"
                                                        alt="bitcoin"
                                                    />
                                                    <span className="tcn-1 fs-sm">75</span>
                                                </div>
                                                <div className="v-line" />
                                                <div className="d-flex align-items-center gap-2">
                                                    <img
                                                        className="w-100"
                                                        src="assets/img/tether.png"
                                                        alt="tether"
                                                    />
                                                    <span className="tcn-1 fs-sm">$49.97</span>
                                                </div>
                                            </div>
                                            <div className="ticket-fee bgn-3 d-flex align-items-center gap-1 py-2 px-3 h-100">
                                                <i className="ti ti-ticket fs-base tcp-2" />
                                                <span className="tcn-1 fs-sm">Free Entry</span>
                                            </div>
                                            <div className="date-time bgn-3 d-flex align-items-center gap-1 py-2 px-3 h-100">
                                                <i className="ti ti-calendar fs-base tcn-1" />
                                                <span className="tcn-1 fs-sm">OCT 07, 5:10 AM</span>
                                            </div>
                                        </div>
                                        <div className="hr-line line3" />
                                        <div className="card-more-info d-between mt-6">
                                            <div className="teams-info d-between gap-xl-5 gap-3">
                                                <div className="teams d-flex align-items-center gap-1">
                                                    <i className="ti ti-users fs-base" />
                                                    <span className="tcn-6 fs-sm">12/12 Teams</span>
                                                </div>
                                                <div className="player d-flex align-items-center gap-1">
                                                    <i className="ti ti-user fs-base" />
                                                    <span className="tcn-6 fs-sm">128 Players</span>
                                                </div>
                                            </div>
                                            <a href="tournaments-details.html" className="btn2">
                                                <i className="ti ti-arrow-right fs-2xl" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="tournament-card p-xl-4 p-3 bgn-4">
                                    <div className="tournament-img mb-8 position-relative">
                                        <div className="img-area overflow-hidden">
                                            <img
                                                className="w-100"
                                                src="assets/img/tournament2.png"
                                                alt="tournament"
                                            />
                                        </div>
                                        <span className="card-status position-absolute start-0 py-2 px-6 tcn-1 fs-sm">
                                            <span className="dot-icon alt-icon ps-3">Playing</span>
                                        </span>
                                    </div>
                                    <div className="tournament-content px-xl-4 px-sm-2">
                                        <div className="tournament-info mb-5">
                                            <a href="tournaments-details.html" className="d-block">
                                                <h4 className="tournament-title tcn-1 mb-1 cursor-scale growDown title-anim">
                                                    Superliga Weekly
                                                </h4>
                                            </a>
                                            <span className="tcn-6 fs-sm">Torneo Individual</span>
                                        </div>
                                        <div className="hr-line line3" />
                                        <div className="card-info d-flex align-items-center gap-3 flex-wrap my-5">
                                            <div className="price-money bgn-3 d-flex align-items-center gap-3 py-2 px-3 h-100">
                                                <div className="d-flex align-items-center gap-2">
                                                    <img
                                                        className="w-100"
                                                        src="assets/img/bitcoin.png"
                                                        alt="bitcoin"
                                                    />
                                                    <span className="tcn-1 fs-sm">75</span>
                                                </div>
                                                <div className="v-line" />
                                                <div className="d-flex align-items-center gap-2">
                                                    <img
                                                        className="w-100"
                                                        src="assets/img/tether.png"
                                                        alt="tether"
                                                    />
                                                    <span className="tcn-1 fs-sm">$49.97</span>
                                                </div>
                                            </div>
                                            <div className="ticket-fee bgn-3 d-flex align-items-center gap-1 py-2 px-3 h-100">
                                                <i className="ti ti-ticket fs-base tcp-2" />
                                                <span className="tcn-1 fs-sm">Free Entry</span>
                                            </div>
                                            <div className="date-time bgn-3 d-flex align-items-center gap-1 py-2 px-3 h-100">
                                                <i className="ti ti-calendar fs-base tcn-1" />
                                                <span className="tcn-1 fs-sm">OCT 07, 5:10 AM</span>
                                            </div>
                                        </div>
                                        <div className="hr-line line3" />
                                        <div className="card-more-info d-between mt-6">
                                            <div className="teams-info d-between gap-xl-5 gap-3">
                                                <div className="teams d-flex align-items-center gap-1">
                                                    <i className="ti ti-users fs-base" />
                                                    <span className="tcn-6 fs-sm">12/12 Teams</span>
                                                </div>
                                                <div className="player d-flex align-items-center gap-1">
                                                    <i className="ti ti-user fs-base" />
                                                    <span className="tcn-6 fs-sm">128 Players</span>
                                                </div>
                                            </div>
                                            <a href="tournaments-details.html" className="btn2">
                                                <i className="ti ti-arrow-right fs-2xl" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="tournament-card p-xl-4 p-3 bgn-4">
                                    <div className="tournament-img mb-8 position-relative">
                                        <div className="img-area overflow-hidden">
                                            <img
                                                className="w-100"
                                                src="assets/img/tournament3.png"
                                                alt="tournament"
                                            />
                                        </div>
                                        <span className="card-status position-absolute start-0 py-2 px-6 tcn-1 fs-sm">
                                            <span className="dot-icon alt-icon ps-3">Playing</span>
                                        </span>
                                    </div>
                                    <div className="tournament-content px-xl-4 px-sm-2">
                                        <div className="tournament-info mb-5">
                                            <a href="tournaments-details.html" className="d-block">
                                                <h4 className="tournament-title tcn-1 mb-1 cursor-scale growDown title-anim">
                                                    Liga Triunfo
                                                </h4>
                                            </a>
                                            <span className="tcn-6 fs-sm">Torneo Individual</span>
                                        </div>
                                        <div className="hr-line line3" />
                                        <div className="card-info d-flex align-items-center gap-3 flex-wrap my-5">
                                            <div className="price-money bgn-3 d-flex align-items-center gap-3 py-2 px-3 h-100">
                                                <div className="d-flex align-items-center gap-2">
                                                    <img
                                                        className="w-100"
                                                        src="assets/img/bitcoin.png"
                                                        alt="bitcoin"
                                                    />
                                                    <span className="tcn-1 fs-sm">75</span>
                                                </div>
                                                <div className="v-line" />
                                                <div className="d-flex align-items-center gap-2">
                                                    <img
                                                        className="w-100"
                                                        src="assets/img/tether.png"
                                                        alt="tether"
                                                    />
                                                    <span className="tcn-1 fs-sm">$49.97</span>
                                                </div>
                                            </div>
                                            <div className="ticket-fee bgn-3 d-flex align-items-center gap-1 py-2 px-3 h-100">
                                                <i className="ti ti-ticket fs-base tcp-2" />
                                                <span className="tcn-1 fs-sm">Free Entry</span>
                                            </div>
                                            <div className="date-time bgn-3 d-flex align-items-center gap-1 py-2 px-3 h-100">
                                                <i className="ti ti-calendar fs-base tcn-1" />
                                                <span className="tcn-1 fs-sm">OCT 07, 5:10 AM</span>
                                            </div>
                                        </div>
                                        <div className="hr-line line3" />
                                        <div className="card-more-info d-between mt-6">
                                            <div className="teams-info d-between gap-xl-5 gap-3">
                                                <div className="teams d-flex align-items-center gap-1">
                                                    <i className="ti ti-users fs-base" />
                                                    <span className="tcn-6 fs-sm">12/12 Teams</span>
                                                </div>
                                                <div className="player d-flex align-items-center gap-1">
                                                    <i className="ti ti-user fs-base" />
                                                    <span className="tcn-6 fs-sm">128 Players</span>
                                                </div>
                                            </div>
                                            <a href="tournaments-details.html" className="btn2">
                                                <i className="ti ti-arrow-right fs-2xl" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
