import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageRarity = () => {
  return (
    <section className={"relative mt-10 md:mt-24"}>
      <div className="overflow-hidden py-24 sm:py-32">
        <div
          className={
            "mx-auto max-w-7xl bg-slate-50 px-0 md:bg-transparent md:px-6 lg:px-8"
          }
        >
          <div
            className={
              "mx-auto flex flex-col rounded-3xl bg-slate-50 py-24 lg:mx-0"
            }
          >
            <div
              className={
                "relative flex h-52 w-full justify-center sm:h-64 md:h-80 lg:h-96"
              }
            >
              <LazyLoadImage
                src={"images/item-back.jpg"}
                width={"100%"}
                height={"100%"}
                // effect={"blur"}
                alt={"Image Alt"}
                className={"h-full w-full object-contain"}
              />
            </div>

            <div className={"px-6 pt-16 md:px-0"}>
              <div className={"text-center"}>
                <h1
                  className={
                    "m-auto text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:max-w-1xl"
                  }
                >
                  <span className={"block text-violet-500 lg:inline"}>
                    Ultra Rare
                  </span>{" "}
                  Galaxy-Devices
                </h1>
                <p className="mx-auto max-w-2xl pt-12 text-lg leading-8 text-gray-900">
                  Through special discounts and various events just for college
                  students, we provide not only tools for studying but also
                  products that can provide complete satisfaction in your
                  leisure time. “A solution optimized for your studies and daily
                  life, join GU Shop now!”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageRarity;
