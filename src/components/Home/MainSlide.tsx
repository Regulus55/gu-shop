import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"; // 필요한 모듈 가져오기
import "swiper/swiper-bundle.css"; // 스타일 가져오기
import { GALAXY_BREAK_POINTS } from "../../data/Home/SlideOptions";

const MySlider = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      // spaceBetween={50}
      // slidesPerView={3}
      breakpoints={GALAXY_BREAK_POINTS}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>

      {/* {PRODUCT_LOADING_ARRAY.map((item) => (
        <SwiperSlide key={item}>
          Slide {item} 
        </SwiperSlide>
      ))} */}
    </Swiper>
  );
};

export default MySlider;
