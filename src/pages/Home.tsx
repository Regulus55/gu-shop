import ItemIntro from "components/Home/ItemIntro";
import ImageNew from "../components/Home/ImageNew";
import NewArrivalSlide from "components/Home/NewArrivalSlide";
import Intro from "components/Home/Intro";
import MainSlider from "components/Home/MainSlide";
import GalaxySlide from "components/Home/GalaxySlide";

const Home = () => {
  return (
    <>
      <MainSlider />
      <Intro />
      <NewArrivalSlide />
      <ImageNew />
      <ItemIntro />
      <GalaxySlide />
    </>
  );
};

export default Home;
