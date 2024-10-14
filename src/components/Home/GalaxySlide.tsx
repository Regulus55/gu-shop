import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import ProductTitle from "../ui/ProductTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import {
  GALAXY_BREAK_POINTS,
  GALAXY_LOADING_ARRAY,
} from "../../data/Home/SlideOptions";
import { productData } from "../../data/layout/LayoutData";
import ProductCard1 from "../ui/ProductCard1";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GalaxySlide = () => {
  return (
    <section className={"mx-auto my-12 w-full max-w-7xl mb-24 py-4 md:mt-20"}>
      <div className={"flex items-center justify-between px-6"}>
        <ProductTitle title={"Collect Trending Galaxy Product"} />
        <div className="hidden items-center justify-center sm:flex">
          <div className="swiper-button image-swiper-button-prev mr-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300">
            <ChevronLeftIcon className="h-6 w-6" />
          </div>
          <div className="swiper-button image-swiper-button-next ml-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300">
            <ChevronRightIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
      <Swiper
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "opacity-20",
        }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={GALAXY_BREAK_POINTS}
        modules={[Navigation]}
        loop={true}
        className="relative overscroll-y-contain !px-6 !pt-6 !pb-2 sm:!pt-10"
      >
        {productData?.map((data) => (
          <SwiperSlide
            key={data.id}
            className={
              "group cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out"
            }
          >
            <ProductCard1 img={data.img} title={data.title} id={data.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default GalaxySlide;
