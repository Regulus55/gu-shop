import Faq from "components/Home/Faq";
import Intro from "components/Home/Intro";
import Main from "components/Home/Main";
import ImageRarity from "../components/Home/ImageRarity";
import SlideContainer from "../components/Home/SlideContainer";
import Main2 from "components/Home/Main2";

const Home = () => {
  return (
    <>
      <Main2 />
      <Main />
      <ImageRarity />

      <Intro />
      <SlideContainer />
      <Faq />
    </>
  );
};

export default Home;
