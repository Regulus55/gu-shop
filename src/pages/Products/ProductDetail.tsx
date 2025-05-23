import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { classNames } from "../../utiles/utiles";
import { FreeMode, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductType } from "../../utiles/interfaces";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { RadioGroup } from "@headlessui/react";
import { Button } from "../../components/ui";
import { PiArrowFatRightThin } from "react-icons/pi";
import axios from "axios";

// interface DetailProps {
//   category: {
//     [key: string]: string
//   };
//   colors: string[];
//   description: string;
//   highlights: string[];
//   id: string;
//   name: string;
//   options: string;
//   details: string;
//   price: number;
//   productImgs: string[];
//   tags: string[];
// }

const ProductDetail = () => {
  const params = useParams(); // useparams
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);

  const [cartAdded, setCartAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [notice, setNotice] = useState(false);

  // product 데이터 가져오기
  const [productDetail, setProductDetail] = useState<ProductType | null>(null);
  const getProductDetail = async () => {
    try {
      const url = `http://localhost:8000/api/product/${params.id}`;
      const result = await axios.get(url);
      setProductDetail(result.data.body);
      console.log("getProductDetail", result.data.body);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProductDetail();
  }, []);

  const checkCartItem = ({ id, image, title, price }: any) => {};

  const handleInputChange = (value: string) => {};

  const handleClick = () => {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto mb-32 max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <div>
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                modules={[FreeMode, Thumbs]}
                className="mySwiper2"
              >
                {productDetail?.productImgs?.map((img: string) => (
                  <SwiperSlide key={img}>
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 pt-[100%]">
                      <div className="absolute inset-0 translate-x-1/2 translate-y-1/2">
                        <LazyLoadImage
                          src={img}
                          alt={productDetail?.description}
                          className="absolute top-0 left-0 w-auto w-auto -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={16}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="mySwiper mt-4"
              >
                {productDetail?.productImgs?.map((img: string) => (
                  <SwiperSlide key={img}>
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 pt-[100%]">
                      <div className="absolute inset-0 translate-x-1/2 translate-y-1/2">
                        <LazyLoadImage
                          src={img}
                          alt={productDetail?.description}
                          className="absolute top-0 left-0 h-auto w-auto -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product info */}
            <div className="mx-auto w-full pl-0 pt-10 pb-16 lg:pl-8 lg:pt-0 lg:pb-24">
              Title
              <div className=" lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {productDetail?.name}
                  <h4 className="text-sm text-gray-500 mt-1">
                    {productDetail?.model}
                  </h4>
                </h1>
              </div>
              {/* Options */}
              <div className="mt-4 lg:mt-0">
                <h2 className="sr-only">Product information</h2>

                {/* 가격부분 */}
                <div className={"flex items-center justify-center pt-8"}>
                  <div
                    className={
                      "relative rounded-lg border-2 border-gray-400 px-2 py-1 text-center "
                    }
                  >
                    <span className={"text-xl text-gray-400 whitespace-nowrap"}>
                      Reference Price
                    </span>
                    <p
                      className={
                        "text-xl text-gray-400 leading-tight line-through"
                      }
                    >
                      ₩{" "}
                      {productDetail?.price
                        ? Math.floor(productDetail?.price).toLocaleString()
                        : "No Price Info"}
                    </p>
                  </div>
                  <PiArrowFatRightThin className="text-5xl text-gray-700 mx-6" />
                  <div
                    className={
                      "relative rounded-lg border-2 font-bold border-gray-500 p-1 bg-white text-center"
                    }
                  >
                    <span
                      className={
                        "px-2 text-2xl text-gray-700 whitespace-nowrap"
                      }
                    >
                      Promotional Price
                    </span>
                    <p className={"text-3xl font-bold text-violet-500"}>
                      ₩{" "}
                      {productDetail?.price
                        ? Math.floor(productDetail?.price).toLocaleString()
                        : "No Price Info"}
                    </p>
                  </div>
                </div>

                <div className={"mt-10"}>
                  {/*colors*/}
                  <div className={"flex items-center justify-between"}>
                    <h3 className={"text-sm font-medium text-gray-900"}>
                      Color
                    </h3>
                  </div>
                </div>

                <RadioGroup
                  // value={selectedColor}
                  onChange={(value: string) => handleInputChange(value)}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color{" "}
                  </RadioGroup.Label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {productDetail?.colors?.map((color: string, i: number) => (
                      <RadioGroup.Option
                        key={color}
                        value={color}
                        disabled={!color}
                        style={
                          {
                            // border: `5px solid ${
                            //   productWithCurrentId?.colorbuttons
                            //     ? productWithCurrentId?.colorbuttons[i]
                            //     : "gray"
                            // }`,
                          }
                        }
                        className={({ active }) =>
                          classNames(
                            // 버튼안쪽 css
                            color
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            active ? "ring-2 ring-blue-500" : "",
                            "group relative flex max-h-[44px] text-center items-center justify-center rounded-xl border py-6 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                          )
                        }
                      >
                        {/* 선택시 */}
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label
                              as="span"
                              className={classNames(
                                active ? "" : "",
                                checked
                                  ? "text-gray-700 font-bold scale-110"
                                  : "text-gray-500",
                                "z-10"
                              )}
                            >
                              <div>{color}</div>
                            </RadioGroup.Label>
                            {color ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-4",
                                  checked
                                    ? "border-violet-400 bg-gray-200 rounded-lg z-0"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-xl border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <Button
                  text="Add to bag"
                  // onClick={() => {
                  //     const id = productData?.id;
                  //     const image = productData?.image[0];
                  //     const title = productData?.title;
                  //     const price = productData?.price;
                  //     return checkCartItem({
                  //         id,
                  //         image,
                  //         title,
                  //         price,
                  //     });
                  // }}
                  className="mt-10 flex max-h-[44px] w-full items-center justify-center rounded-md border border-transparent bg-violet-500 py-2 px-8 text-base font-medium leading-7 text-white hover:bg-violet-600"
                />
              </div>
              <div className={"py-10 lg:border-gray-200 lg:pt-6 lg:pb-16"}>
                {/*discriptions detail*/}
                <div>
                  <h3 className={"sr-only"}>Description</h3>

                  <div className={"space-y-6"}>
                    <p className={"text-md text-gray-900"}>
                      {productDetail?.description}
                    </p>
                  </div>
                </div>

                <div className={"mt-8"}>
                  <h3 className={"text-md font-medium text-gray-900"}>
                    Highlights
                  </h3>
                </div>

                <div className={"mt-3"}>
                  <ul
                    className={"list-disc space-y-2 pl-4 text-md"}
                    role={"list"}
                  >
                    {productDetail?.highlights?.map((data) => (
                      <li key={data} className={"text-gray-400"}>
                        <span className={"text-gray-600"}>{data}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* detail */}
                {/* <div className={"mt-10"}>
                                <h2 className={"text-sm font-medium text-gray-900"}>
                                  Details
                                </h2>
                                <div className={"mt-4 space-y-6"}>
                                  <p className={"text-sm text-gray-600"}>
                                    {productWithCurrentId?.details}
                                  </p>
                                </div>
                              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
