import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ItemIntro = () => {
  return (
    <section className={"mt-16 mb-32 bg-white md:mt-32"}>
      <div className={"mx-auto max-w-8xl"}>
        <div className={"relative overflow-hidden px-6 lg:px-8"}>
          <div className={"mx-auto max-w-4xl pt-16 sm:pt-20 lg:pt-24"}>
            <div className={"text-center "}>
              <h1
                className={
                  "text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                }
              >
                Created for You
              </h1>

              <div className={"relative pt-12 text-lg leading-8 text-gray-900"}>
                <p>
                  Welcome to the GU shop for college students! A smart choice
                  just for college students, GU shop! Check out the latest
                  Galaxy smartphones, tablets, laptops, and wearable devices
                  that can help you with your classes, assignments, and hobbies
                  all at once. Through special discounts and various events just
                  for college students, we provide not only tools for studying
                  but also products that can provide complete satisfaction in
                  your leisure time.
                </p>
                <LazyLoadImage
                  src={"/images/rary.png"}
                  width={800}
                  height={600}
                  alt={"Image Alt"}
                  className={"relative z-10 mx-auto mt-10 pb-10"}
                />
                <span className="text-2xl">
                  Find the product you want at GU Shop!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemIntro;
