import Faq from "components/Home/Faq";
import ItemIntro from "components/Home/ItemIntro";
import ImageNew from "../components/Home/ImageNew";
import SlideContainer from "../components/Home/SlideContainer";
import NewArrivalSlide from "components/Home/NewArrivalSlide";
import Intro from "components/Home/Intro";
import MainSlider from "components/Home/MainSlide";

const Home = () => {
  return (
    <>
      <MainSlider />
      <Intro />
      <NewArrivalSlide />
      <ImageNew />
      <ItemIntro />
      <SlideContainer />
      {/* <Faq /> */}
    </>
  );
};

export default Home;
