import React from "react";

import HeroSection from "../layouts/HeroSection";
import Swiper3DSection from "../layouts/Swiper3DSection";
import TopPlayer from "../layouts/TopPlayer";
import TournamentSection from "../layouts/TournamentSection";
import GameSection from "../layouts/GameSection";
import Footer from "../layouts/Footer";
export default function HomePage() {
  return (
    <>
      <div className="cursor" />

      <HeroSection />
      <Swiper3DSection />
      <TopPlayer />
      <TournamentSection />
      <GameSection />
      <Footer />
    </>
  );
}
