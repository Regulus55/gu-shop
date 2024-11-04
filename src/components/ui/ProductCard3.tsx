import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TagIcon } from "@heroicons/react/16/solid";
import { ProductType } from "utiles/interfaces";
// import {smartphone} from "data/Products/collectionsData";

interface ProductCardProps {
  title: string;
  model: string;
  referencePrice: number;
  promotionalPrice: number;
  category: string;
  subCategory?: string;
  id?: number;
  image?: string[];
  description: string;
  highlights?: string[];
  details?: string;
  tags?: string[];
  colors?: string[];
  colorbuttons?: string[];
  options?: string;
  inventory?: number;
}

const ProductCard3 = ({
  title,
  model,
  referencePrice,
  promotionalPrice,
  category,
  subCategory,
  id,
  image,
  description,
  highlights,
  details,
  colors,
  colorbuttons,
  tags,
  inventory,
}: ProductCardProps) => {
  const formattedReferencePrice = referencePrice.toLocaleString();
  const formattedPromotionalPrice = promotionalPrice.toLocaleString();

  if (!id) {
    return <h1>Product Empty</h1>;
  }

  return (
    <Link
      to={`/products/${id}`}
      state={{
        title,
        model,
        referencePrice,
        promotionalPrice,
        category,
        id,
        colors,
        image,
        description,
        highlights,
        details,
        tags,
      }}
    >
      <div
        className={
          "relative isolate overflow-hidden rounded-2xl bg-gray-100 pt-[100%]"
        }
      >
        <div className={"absolute inset-0 translate-x-1/2 translate-y-1/2"}>
          <LazyLoadImage
            src={image && Array.isArray(image) ? image[0] : image}
            alt={title}
            className={
              "absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75 "
            }
          />
        </div>
      </div>

      <div className={"p-5"}>
        <h3 className={"text-center text-2xl font-bold text-gray-900 mb-1"}>
          {title}
        </h3>
        <h5 className="text-center text-xs text-gray-500">{model}</h5>

        <div
          className={`grid my-2 ${
            colors?.length === 1
              ? "grid-cols-1"
              : colors?.length === 2
              ? "grid-cols-2"
              : colors?.length === 3
              ? "grid-cols-3"
              : "grid-cols-4"
          }`}
        >
          {colorbuttons?.map((color) => (
            // <div
            //   className="border-2 rounded-lg bg-white mx-1 py-1"
            //   style={{ border: `2px solid ${color}` }}
            // >
            <div
              className="text-center rounded-lg h-8 border-2 mx-1 "
              style={{ backgroundColor: color }}
            />
            // </div>
          ))}
        </div>

        {/* 가격 */}
        <div className={"flex items-center justify-center pt-5"}>
          <div
            className={
              "relative rounded-lg border-2 border-gray-400 px-2 py-0.5 text-center -mt-10"
            }
          >
            <span className={"text-xs text-gray-400 whitespace-nowrap"}>
              Reference Price
            </span>
            <p className={"text-sm text-gray-400 leading-tight line-through"}>
              ₩ {formattedReferencePrice}
            </p>
          </div>

          <div
            className={
              "relative rounded-lg border-2 border-gray-700 px-1 py-1 bg-white -ml-8  text-center"
            }
          >
            <span
              className={
                "px-2 text-lg text-gray-700 font-bold whitespace-nowrap"
              }
            >
              Promotional Price
            </span>
            <p className={"text-xl font-bold text-blue-500"}>
              ₩ {formattedPromotionalPrice}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard3;
