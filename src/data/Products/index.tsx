export const FILTERS = [
  {
    name: "Color",
  },
  {
    name: "Size",
  },
];

export const COLLECTION = ["Smartphone", "Computer", "Accessory"];

interface Category {
  type: string;
}

interface CategoryMap {
  [key: string]: Category;
}

// 왼쪽 카테고리
export const CATEGORIES: CategoryMap = {
  Clothing: { type: "category" },
  Accessories: { type: "category" },
  Tops: { type: "subCategory" },
  Bags: { type: "subCategory" },
};

// sort option
export const SORT_OPTIONS = [
  { name: "Relevance", query: "" },
  { name: "Most Popular", query: "likes" },
  { name: "Newest", query: "registrationDate" },
  { name: "Price: Low to High", query: "priceAsc" },
  { name: "Price: High to Low", query: "priceDesc" },
];

// nft
export const FILTERITEM = ["Background", "Body", "Eyes", "Hat", "Nose"];
export const LOADING_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8];

// cart
export const SHIPPING = 5;

// check out
export const CANADA_STATE = [
  "",
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Larbrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];
