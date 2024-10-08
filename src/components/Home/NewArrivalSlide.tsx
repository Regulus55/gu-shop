import ProductTitle from "../ui/ProductTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { newArrivalsData } from "../../data/layout/LayoutData";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import ProductCard2 from "../ui/ProductCard2";
import { NEW_BREAK_POINTS } from "data/Home/SlideOptions";

const NewGalaxySlide = () => {
  return (
    <section className={"mx-auto mt-12 w-full max-w-7xl py-4 md:mt-20"}>
      <ProductTitle title={"New Arrivals"} />
      <Swiper
        navigation={{
          nextEl: ".image-swiper-button-next-Product",
          prevEl: ".image-swiper-button-prev-Product",
          disabledClass: "opacity-20",
        }}
        spaceBetween={30}
        slidesPerView={3}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        breakpoints={NEW_BREAK_POINTS}
        modules={[Pagination, Navigation]}
        className="!px-6 !pb-14 !pt-10"
      >
        {newArrivalsData?.map((data) => (
          <SwiperSlide
            key={data.id}
            className={
              "group cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out hover:shadow-md"
            }
          >
            <ProductCard2
              img={data.img}
              title={data.title}
              id={data.id}
              price={data.price}
            />
          </SwiperSlide>
        ))}

        <div className={"mt-8 flex items-center justify-center"}>
          <div
            className={
              "swiper-button image-swiper-button-prev-Product mr-4 h-6 w-6 cursor-pointer"
            }
          >
            <ChevronLeftIcon />
          </div>
          <div className={"custom-pagination flex justify-center"} />
          <div
            className={
              "swiper-button image-swiper-button-next-Product ml-4 h-6 w-6 cursor-pointer"
            }
          >
            <ChevronRightIcon />
          </div>
        </div>
      </Swiper>
    </section>
  );
};

export default NewGalaxySlide;
