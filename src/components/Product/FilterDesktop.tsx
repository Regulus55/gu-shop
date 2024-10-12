import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterPropsType } from "utiles/interfaces";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";

const FilterDesktop = ({
  isLoading,
  allCategories,
  filters,
  colors,
  sizes,
  setSortParams,
  deleteSortParams,
  searchParams,
  pageData,
}: FilterPropsType) => {
  const [activeButton, setActiveButton] = useState("");
  const clickedButtonHandler = (name: string) => {
    if (name === activeButton) {
      setActiveButton("");
      deleteSortParams("item");
    } else {
      setActiveButton(name);
      setSortParams("item", name);
    }
  };

  useEffect(() => {
    setActiveButton(searchParams.get("item") ?? "");
  }, [searchParams]);

  return (
    <div className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>
      <ul
        role="list"
        className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
      >
        {isLoading && (
          <>
            <li className="h-6 w-full animate-pulse rounded-md bg-slate-50"></li>
            <li className="h-6 w-full animate-pulse rounded-md bg-slate-50"></li>
          </>
        )}
        {allCategories.map((props, i) => (
          <li key={props}>
            {pageData === "subCategory" ? (
              <button
                onClick={() => {
                  clickedButtonHandler(props);
                }}
                className={`${
                  activeButton === props
                    ? "font-bold text-violet-500"
                    : "text-gray-900"
                }`}
              >
                {props}
              </button>
            ) : (
              <Link to={`/collections/${props}`} className="text-gray-900">
                {props}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <ul>
        {filters.map(({ name }) => (
          <Disclosure
            as="li"
            key={name}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                {/* filter header */}
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">{name}</span>
                    <span className="ml-6 items-center">
                      {name}
                      {open ? (
                        <>
                          <MinusIcon />
                          {/* <div>ddd</div> */}
                        </>
                      ) : (
                        <PlusIcon />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>

                {/* filter body */}
                {name === "Color" && (
                  <ColorFilter
                    colors={colors}
                    setSortParams={setSortParams}
                    deleteSortParams={deleteSortParams}
                    params={searchParams.get("color")}
                    searchParams={searchParams}
                  />
                )}
                {name === "Size" && (
                  <SizeFilter
                    sizes={sizes}
                    setSortParams={setSortParams}
                    deleteSortParams={deleteSortParams}
                    params={searchParams.get("size")}
                    searchParams={searchParams}
                  />
                )}
              </>
            )}
          </Disclosure>
        ))}
      </ul>
    </div>
  );
};

export default FilterDesktop;
