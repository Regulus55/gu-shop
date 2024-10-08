import React from "react";
import { Link } from "react-router-dom";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import MainImage from "./MainImage";
import { MAIN_DATA } from "data/Home/homeData";

const Main = () => {
  return (
    <section className="relative">
      <div
        className="w-full  h-[800px] bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: "url('/images/shoes.jpg')",
          backgroundPosition: "center",
          filter: "blur(3px)",
        }}
      />
      {/* <svg
          className="absolute bottom-0 left-0 w-full h-[100px] fill-current text-red-500"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z" />
        </svg> */}

      {/* 제목부분 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <span className="text-white text-xl mb-12">
            An Online Shopping Mall for College Students
            <hr className="flex-1 border-t-2 border-gray-200 mx-2" />
          </span>
        </div>

        <h1 className="text-white text-5xl font-bold mb-10">
          {/* Galaxy University Shop */}
          For College Students
        </h1>

        <div className="text-white text-xl mb-10 w-1/2 text-center">
          At GU Shop, we provide products designed to meet the needs of college
          students. From study tools to technology for leisure time, we offer a
          variety of smart devices exclusively for you. Check out the special
          discounts and events just for you!
        </div>

        {/* <div className="overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pt-12">
                <div className="lg:max-w-xl">
                  <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-left">
                    Welcome to the World of
                    <br />
                    <span className="block text-violet-500 lg:inline">
                      GU shop
                    </span>
                  </h1>
                  <p className="mt-6 text-center text-lg leading-8 text-gray-600 lg:text-left">
                    <span className="inline font-semibold text-gray-900">
                      Galaxy University Shop{" "}
                    </span>{" "}
                    is shopping mall exclusively for university students
                  </p>
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-y-4 gap-x-6 sm:flex-nowrap sm:gap-y-4 lg:justify-start">
                    <Link
                      to="/nfts"
                      className="flex w-full items-center justify-center rounded-md bg-violet-500 px-4 py-2 text-base font-semibold leading-7 text-white shadow-sm transition-all hover:bg-violet-600 sm:w-fit"
                    >
                      See the Collection
                      <GlobeEuropeAfricaIcon className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      to="/collections"
                      className="flex max-h-[44px] w-full items-center justify-center rounded-md border border-violet-500 px-4 py-2 text-base font-semibold leading-7 text-violet-500 shadow-sm transition-all hover:shadow-violet-500 sm:w-fit"
                    >
                      Shop Now
                      <GlobeEuropeAfricaIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className={"relative flex h-96 justify-center"}> */}

        {/* {MAIN_DATA.map(
                  ({
                    name,
                    price,
                    time,
                    image,
                    rotation,
                    scale,
                    direction,
                    zIndex,
                  }) => (
                    <MainImage
                      key={name}
                      name={name}
                      price={price}
                      time={time}
                      image={image}
                      rotation={rotation}
                      scale={scale}
                      direction={direction}
                      zIndex={zIndex}
                    />
                  )
                )} */}
        {/* </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Main;
