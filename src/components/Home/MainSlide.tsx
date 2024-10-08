import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper"; // 필요한 모듈 가져오기
import "swiper/swiper-bundle.css"; // 스타일 가져오기
import { MAIN_BREAK_POINTS } from "../../data/Home/SlideOptions";
import { mainSlidesData } from "data/layout/LayoutData";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const MainSlider = () => {
  return (
    <section className="bg-slate-100 pb-10">
      <Swiper
        navigation={{
          nextEl: ".main-image-swiper-button-next-Product",
          prevEl: ".main-image-swiper-button-prev-Product",
          disabledClass: "opacity-20",
        }}
        // breakpoints={MAIN_BREAK_POINTS}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        // spaceBetween={50}
        breakpoints={MAIN_BREAK_POINTS}
        scrollbar={{ draggable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {mainSlidesData?.map((data) => (
          <SwiperSlide key={data.id}>
            <div
              className="w-full h-[700px] bg-cover bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${data.img})`,
                backgroundPosition: "center",
                filter: "blur(5px) brightness(0.5)",
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex flex-row items-center justify-center">
                <span className="text-white text-xl mb-12">
                  An Online Shopping Mall for College Students
                  <hr className="flex-1 border-t-2 border-gray-200 mx-2" />
                </span>
              </div>

              <h1 className="text-white text-5xl font-bold mb-10">
                {data.title}
              </h1>

              <div
                className={
                  "text-white text-xl mb-10 w-1/2 text-center hidden lg:block"
                }
              >
                {data.description}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={"mt-8 flex items-center justify-center"}>
        <div
          className={
            "swiper-button main-image-swiper-button-prev-Product mr-4 h-6 w-6 cursor-pointer"
          }
        >
          <ChevronLeftIcon />
        </div>
        <div className={"custom-pagination flex justify-center"} />
        <div
          className={
            "swiper-button main-image-swiper-button-next-Product ml-4 h-6 w-6 cursor-pointer"
          }
        >
          <ChevronRightIcon />
        </div>
      </div>
    </section>
  );
};

export default MainSlider;
