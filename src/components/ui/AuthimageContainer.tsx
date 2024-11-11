import {LazyLoadImage} from "react-lazy-load-image-component";

interface IProps {
  image: string;
  firstText: string;
  secondText: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function AuthImageContainer({
                                             image,
                                             firstText,
                                             secondText,
                                             width,
                                             height,
                                             className
                                           }: IProps) {
  return (
      <div className="col-span-6 hidden h-full w-full items-center bg-slate-50 p-4 lg:flex">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className={`relative z-10 text-4xl font-bold `}>{firstText}</h1>
          <h1 className="relative z-10 mt-2 mb-8 text-4xl font-bold text-violet-500">
            {secondText}
          </h1>
          <LazyLoadImage
              src={image}
              width={width}
              height={height}
              // effect="blur"
              alt="Image Alt"
              className={className}
          />
        </div>
      </div>
  );
}