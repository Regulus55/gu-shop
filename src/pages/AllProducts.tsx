import React, { useEffect, useState } from "react";
import ProductTitle from "../components/ui/ProductTitle";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/16/solid";
import CategorySort from "../components/Product/CategorySort";
import useSortParams from "../hooks/useSortParams";
import FilterDesktop from "../components/Product/FilterDesktop";
import { COLLECTION, FILTERS } from "../data/Products";
import { ProductType } from "../utiles/interfaces";
import { accessory, smartphone, computer } from "data/Products/CollectionsData";
import { ProductCard31 } from "components/ui";
import axios from "axios";

const AllProducts = () => {
  const { query, searchParams, setSortParams, deleteSortParams } =
    useSortParams();

  const [productData, setProductData] = useState<ProductType[]>([]);
  const getProductData = async () => {
    try {
      const url = "http://localhost:8000/api/product?order=ASC&page=1&take=10";
      const result = await axios.get(url);
      setProductData(result.data.body.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProductData();
  }, [productData]);

  // Get Filter Options
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductType[]>([
    ...smartphone.aSeries,
    ...smartphone.sSeries,
    ...smartphone.flipSeries,
    ...smartphone.foldSeries,
    ...computer.tablet,
    ...computer.laptop,
    ...accessory.watch,
    ...accessory.buds,
    ...accessory.ring,
  ]);

  return (
    <div className={"bg-white"}>
      <main className={"mx-auto mb-32 max-w-7xl px-4 sm:px-6 lg:px-8"}>
        {/* Title, Breadcrumbs, Sort */}
        <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
          <div className="flex flex-col">
            {/* page title */}
            <ProductTitle title={"Shop All"} />
          </div>
          <div className={"flex items-center"}>
            <Menu as={"div"} className={"relative inline-block text-left"}>
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <CategorySort
                setSortParams={setSortParams}
                deleteSortParams={deleteSortParams}
                sortParams={searchParams.get("sort")}
                ascParams={searchParams.get("asc")}
              />
            </Menu>

            <button
              className={
                "-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              }
            >
              <span className={"sr-only"}>Filters</span>
              <FunnelIcon className={"h-5 w-5"} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/*{filter}*/}
        <section aria-labelledby={"products-heading"} className={"pt-6 pb-24"}>
          <h2 id={"products-heading"} className={"sr-only"}>
            Products
          </h2>
          <div className={"grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4"}>
            {/*filterBox*/}
            <FilterDesktop
              allCategories={COLLECTION}
              filters={FILTERS}
              colors={colors}
              sizes={sizes}
              setSortParams={setSortParams}
              deleteSortParams={deleteSortParams}
              searchParams={searchParams}
            />

            <div className={"lg:col-span-3"}>
              <ul className={"grid grid-cols-1 gap-6 md:grid-cols-2"}>
                <>{}</>
              </ul>

              <ul
                className={
                  "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                }
              >
                <>
                  {productData?.map((product) => (
                    <li
                      key={product.id}
                      className={
                        "group border border-slate-100 cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out hover:shadow-md"
                      }
                    >
                      <ProductCard31
                        image={product.image}
                        model={product.model}
                        title={product.title}
                        name={product.name}
                        id={product.id}
                        referencePrice={product.referencePrice}
                        promotionalPrice={product.promotionalPrice}
                        price={product.price}
                        category={product.category}
                        tags={product.tags}
                        colors={product.colors}
                        colorbuttons={product.colorbuttons}
                        description={product.description}
                      />
                    </li>
                  ))}
                </>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AllProducts;
