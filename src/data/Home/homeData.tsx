import {
  CircleStackIcon,
  CubeTransparentIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";

export const MAIN_DATA = [
  {
    name: "Galaxy Ring",
    price: 460,
    time: "16: 21: 01",
    image: "/images/ring.png",
    rotation: "-rotate-[12deg]",
    scale: "scale-[.8]",
    direction: "left-0 right-[unset] lg:left-[unset] lg:right-[120px]",
  },
  {
    name: "Galaxy Watch7",
    price: 500,
    time: "12: 21: 01",
    image: "/images/w7.png",
    zIndex: "z-10",
    direction: "right-[unset] lg:right-[60px]",
  },
  {
    name: "Galaxy Flip",
    price: 900,
    time: "09: 21: 01",
    image: "/images/flip6.png",
    rotation: "rotate-[12deg]",
    scale: "scale-[.8]",
    direction: "right-0",
  },
];

export const FAQ_DATA = [
  {
    name: "What is GU Shop?",
    description: `Galaxy University Shop is a shopping space specializing in smart devices for college students.
To make your busy campus life more efficient and smarter, you can find the latest Galaxy smartphones, tablets, laptops, and wearable devices in one place.`,
    icon: CircleStackIcon,
    color: "bg-violet-500",
  },
  {
    name: "Why should you choose the GU Shop?",
    description: `Most electronics stores offer a wide range of home appliances, but GU shop is tailored specifically for college students. We focus on what you need to succeed in your studies and daily life! In addition, GU shop provides a wide range of devices designed to perfectly support students in both their studies and daily lives, with special benefits and discounts available exclusively for college students.`,
    icon: WalletIcon,
    color: "bg-orange-500",
  },
  {
    name: "Does GU Shop have an offline store?",
    description: "GU Shop is based on an online store.",
    icon: CubeTransparentIcon,
    color: "bg-blue-500",
  },
];
