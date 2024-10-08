import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"; // 필요한 모듈 가져오기
import "swiper/swiper-bundle.css"; // 스타일 가져오기
import { MAIN_BREAK_POINTS } from "../../data/Home/SlideOptions";
import { mainSlidesData } from "data/layout/LayoutData";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const MySlider = () => {
  return (
    <>
      <Swiper
        navigation={{
          nextEl: ".image-swiper-button-next-Product",
          prevEl: ".image-swiper-button-prev-Product",
          disabledClass: "opacity-20",
        }}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        // spaceBetween={50}
        breakpoints={MAIN_BREAK_POINTS}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        //   className="w-full"
      >
        {mainSlidesData?.map((data) => (
          <SwiperSlide key={data.id}>
            <div
              className="w-full  h-[800px] bg-cover bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${data.img})`,
                backgroundPosition: "center",
                filter: "blur(3px)",
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

              <div className="text-white text-xl mb-10 w-1/2 text-center">
                {data.description}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
    </>
  );
};

export default MySlider;
