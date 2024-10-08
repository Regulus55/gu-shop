import Faq from "components/Home/Faq";
import ItemIntro from "components/Home/ItemIntro";
import ImageNew from "../components/Home/ImageNew";
import SlideContainer from "../components/Home/SlideContainer";
import NewArrivalSlide from "components/Home/NewArrivalSlide";
import Main2 from "components/Home/Main2";
import Intro from "components/Home/Intro";

const Home = () => {
  return (
    <>
      <Main2 />
      <Intro />
      <NewArrivalSlide />
      <ImageNew />
      <ItemIntro />
      <SlideContainer />
      <Faq />
    </>
  );
};

export default Home;
