import React from 'react'

export default function GameSection() {
    return (
        <section className="game-section">
            <div className="red-ball bottom-0 end-0" />
            <div className="container">
                <div className="row justify-content-between align-items-center mb-15">
                    <div className="col-6">
                        <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
                            Games
                        </h2>
                    </div>
                    <div className="col-6 text-end">
                        <a
                            href="game.html"
                            className="btn-half-border position-relative d-inline-block py-2 px-6 bgp-1 rounded-pill"
                        >
                            View More
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="swiper game-swiper">
                            <div className="swiper-wrapper mb-lg-15 mb-10">
                                <div className="swiper-slide">
                                    <div className="game-card-wrapper mx-auto">
                                        <div className="game-card mb-5 p-2">
                                            <div className="game-card-border" />
                                            <div className="game-card-border-overlay" />
                                            <div className="game-img alt">
                                                <img
                                                    className="w-100 h-100"
                                                    src="assets/img/game-x4.png"
                                                    alt="game"
                                                />
                                            </div>
                                            <div className="game-link d-center">
                                                <a href="game.html" className="btn2">
                                                    <i className="ti ti-arrow-right fs-2xl" />
                                                </a>
                                            </div>
                                        </div>
                                        <a href="game.html">
                                            <h3 className="game-title mb-0 tcn-1 cursor-scale growDown2">
                                                AAG Axie Cup
                                            </h3>
                                        </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="game-card-wrapper mx-auto">
                                        <div className="game-card mb-5 p-2">
                                            <div className="game-card-border" />
                                            <div className="game-card-border-overlay" />
                                            <div className="game-img alt">
                                                <img
                                                    className="w-100 h-100"
                                                    src="assets/img/game3.png"
                                                    alt="game"
                                                />
                                            </div>
                                            <div className="game-link d-center">
                                                <a href="game.html" className="btn2">
                                                    <i className="ti ti-arrow-right fs-2xl" />
                                                </a>
                                            </div>
                                        </div>
                                        <a href="game.html">
                                            <h3 className="game-title mb-0 tcn-1 cursor-scale growDown2">
                                                Axie Origin
                                            </h3>
                                        </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="game-card-wrapper mx-auto">
                                        <div className="game-card mb-5 p-2">
                                            <div className="game-card-border" />
                                            <div className="game-card-border-overlay" />
                                            <div className="game-img alt">
                                                <img
                                                    className="w-100 h-100"
                                                    src="assets/img/game4.png"
                                                    alt="game"
                                                />
                                            </div>
                                            <div className="game-link d-center">
                                                <a href="game.html" className="btn2">
                                                    <i className="ti ti-arrow-right fs-2xl" />
                                                </a>
                                            </div>
                                        </div>
                                        <a href="game.html">
                                            <h3 className="game-title mb-0 tcn-1 cursor-scale growDown2">
                                                Free Fire
                                            </h3>
                                        </a>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="game-card-wrapper mx-auto">
                                        <div className="game-card mb-5 p-2">
                                            <div className="game-card-border" />
                                            <div className="game-card-border-overlay" />
                                            <div className="game-img alt">
                                                <img
                                                    className="w-100 h-100"
                                                    src="assets/img/game2.png"
                                                    alt="game"
                                                />
                                            </div>
                                            <div className="game-link d-center">
                                                <a href="game.html" className="btn2">
                                                    <i className="ti ti-arrow-right fs-2xl" />
                                                </a>
                                            </div>
                                        </div>
                                        <a href="game.html">
                                            <h3 className="game-title mb-0 tcn-1 cursor-scale growDown2">
                                                Fortnite
                                            </h3>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center d-center">
                                <div className="game-swiper-pagination" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
