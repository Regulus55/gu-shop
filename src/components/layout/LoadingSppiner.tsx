import React from "react";
import Lottie from "lottie-react";
import loadingBar from "../assets/loadingBar.json";

interface IProps {
  className?: string;
}

const LoadingSppiner: React.FC<IProps> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={loadingBar}
        loop={true}
        autoplay={true}
        className={"h-60 w-60 max-w-screen max-h-screen"}
      />
    </div>
  );
};

export default LoadingSppiner;
