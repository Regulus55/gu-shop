import Faq from "components/Home/Faq";
import Intro from "components/Home/Intro";
import Main from "components/Home/Main";
import ImageRarity from "../components/Home/ImageRarity";
import SlideContainer from "../components/Home/SlideContainer";

const Home = () => {
  return (
    <>
      <Main />
      <Intro />
      <ImageRarity />
      <SlideContainer />
      <Faq />
    </>
  );
};

export default Home;
