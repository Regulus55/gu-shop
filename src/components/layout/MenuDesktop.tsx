import { Dispatch, forwardRef, Fragment, SetStateAction } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { FaShopify } from "react-icons/fa";
import { Popover, Transition } from "@headlessui/react";
import { headerData } from "data/layout/LayoutData";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface menuProps {
  classNames: (...classes: string[]) => string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  navigate: NavigateFunction;
  userData?: (any & { isAdmin?: boolean }) | null;
  loading: boolean;
  logout: () => void;
  isAdmin: boolean | undefined;
  onMouseEnter: (open: boolean) => void;
  onMouseLeave: (open: boolean) => void;
}

const MenuDesktop = forwardRef<HTMLButtonElement, menuProps>(
  (
    {
      classNames,
      setOpen,
      userData,
      navigate,
      loading,
      logout,
      isAdmin,
      onMouseEnter,
      onMouseLeave,
    },
    ref
  ) => {
    return (
      <nav className="relative bg-white">
        <div
          aria-label="Top"
          className="mx-auto max-w-7xl border-gray-200 bg-white px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-16 items-center">
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
            >
              <span className="sr-only">Open Menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="ml-4 flex lg:ml-0">
              <Link to="/" className="flex items-center">
                <FaShopify size="40px" color="#885CF6" className="mr-2" />
              </Link>
            </div>

            <Popover.Group className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {headerData.categories.map((category) => (
                  <Popover key={category.name} className="flex">
                    {({ open }: { open: boolean }) => (
                      <>
                        <div className="relative flex">
                          <Popover.Button
                            className={classNames(
                              open
                                ? "border-violet-500 text-violet-500"
                                : "border-transparent text-gray-700 hover:text-gray-800",
                              "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out focus:outline-none"
                            )}
                          >
                            {category.name}
                          </Popover.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Popover.Panel className="absolute inset-0 top-full border-t-[1px] border-gray-200 text-sm text-gray-500">
                            <div
                              className="absolute inset-0 top-1/2 bg-white shadow"
                              aria-hidden="true"
                            />

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div
                                        key={item.name}
                                        className="group relative text-base sm:text-sm"
                                      >
                                        <div className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                          <LazyLoadImage
                                            src={item.imageSrc}
                                            alt={item.imageAlt}
                                            className="object-cover object-center"
                                          />
                                        </div>

                                        <Popover.Button
                                          onClick={() => navigate(item.href)}
                                          className="mt-6 block font-medium text-gray-900"
                                        >
                                          <span
                                            className="absolute inset-0 z-10"
                                            aria-hidden="true"
                                          >
                                            {item.name}
                                          </span>
                                        </Popover.Button>
                                        <p aria-hidden="true" className="mt-1">
                                          Shop Now
                                        </p>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <Popover.Button
                                          id={`${section.name}-heading`}
                                          className="cursor-pointer font-medium text-gray-900"
                                          onClick={() => navigate(section.href)}
                                        >
                                          {section.name}
                                        </Popover.Button>
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {section.items?.map((item) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <Popover.Button
                                                onClick={() =>
                                                  navigate(item.href)
                                                }
                                                className="hover:text-gray-800"
                                              >
                                                {item.name}
                                              </Popover.Button>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                ))}
                {headerData.pages.map((page) => (
                  <Link
                    to={page.href}
                    key={page.name}
                    className="flex items-center font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    to="/product/new"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    New Item
                  </Link>
                )}

                {/* ////////////////////login//////////// */}
                <Link
                  to="/login"
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Login
                </Link>
                {/* ////////////////////signup////////////////// */}
                <Link
                  to="/signup"
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  signup
                </Link>
                {/* ////////////////////login////////////////// */}
              </div>
            </Popover.Group>
          </div>
        </div>
      </nav>
    );
  }
);

export default MenuDesktop;
