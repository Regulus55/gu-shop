import React from "react";
import { Link } from "react-router-dom";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import MainImage from "./MainImage";
import { MAIN_DATA } from "data/Home/homeData";
import MainSlide from "./MainSlide";

const Main = () => {
  return (
    <section className="relative">
      <MainSlide />
    </section>
  );
};

export default Main;
