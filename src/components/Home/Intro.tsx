import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Intro = () => {
  return (
    <section className={"mt-16 bg-slate-50 md:mt-32"}>
      <div className={"mx-auto max-w-7xl"}>
        <div className={"relative overflow-hidden px-6 lg:px-8"}>
          <div className={"mx-auto max-w-2xl pt-16 sm:pt-20 lg:pt-24"}>
            <div className={"text-center "}>
              <h1
                className={
                  "text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                }
              >
                What is GU shop?
              </h1>
              <p className="mt-8 text-lg leading-6 text-violet-500">
                Discover Joy and Playfulness through GU Shop.
              </p>
              <div className={"relative pt-12 text-lg leading-8 text-gray-900"}>
                <p>
                  Welcome to the GU shop for college students! A smart choice
                  just for college students, GU shop! Check out the latest
                  Galaxy smartphones, tablets, laptops, and wearable devices
                  that can help you with your classes, assignments, and hobbies
                  all at once.
                  <br />
                  Find the product you want at GU Shop!
                </p>
              </div>
            </div>
          </div>
          <div>
            <LazyLoadImage
              src={"/images/flip.png"}
              width={300}
              height={200}
              alt={"Image Alt"}
              className={"relative -bottom-4 z-10 mx-auto pb-10 mb-10"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
