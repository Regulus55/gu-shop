import Faq from "components/Home/Faq";
import Intro from "components/Home/Intro";
import ImageNew from "../components/Home/ImageNew";
import SlideContainer from "../components/Home/SlideContainer";
import NewArrivalSlide from "components/Home/NewArrivalSlide";
import Main2 from "components/Home/Main2";

const Home = () => {
  return (
    <>
      <Main2 />
      <NewArrivalSlide />
      <ImageNew />
      <Intro />
      <SlideContainer />
      <Faq />
    </>
  );
};

export default Home;
