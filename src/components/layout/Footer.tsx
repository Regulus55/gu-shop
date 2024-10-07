import { Link, useLocation } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import {
  footerCompany,
  footerMarketPlace,
  footerResource,
  footerSocial,
} from "data/layout/LayoutData";

const Footer = () => {
  const location = useLocation();

  return (
    <footer
      className={`mt-auto border-t border-gray-200 ${
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/forgot/email" ||
        location.pathname === "/forgot/password"
          ? "hidden"
          : "block"
      }`}
    >
      <div className="mx-auto flex flex-col items-center">
        <div className="grid w-full max-w-7xl gap-8 py-8 px-4 sm:grid-cols-12 sm:px-6 md:py-12">
          <div className="sm:col-span-12 lg:col-span-6">
            <div className="mb-2">
              <Link className="inline-block flex" aria-label="Cruip" to="/">
                <FaShopify size="64px" color={"#8B5CF6"} />
              </Link>
            </div>
          </div>

          <div
            className={"sm:col-span-6 md:col-span-3 lg:col-span-2 lg:ml-auto"}
          >
            <h6 className={"mb-2 font-medium text-gray-800"}>Market Place</h6>
            <ul className={"text-sm "}>
              {footerMarketPlace.map(({ name, link }) => (
                <li className={"mb-2"} key={name}>
                  <Link
                    to={link}
                    className={
                      "text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                    }
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={"sm:col-span-6 md:col-span-3 lg:col-span-2 lg:ml-auto"}
          >
            <h6 className={"mb-2 font-medium text-gray-800"}>Resources</h6>
            <ul className={"text-sm "}>
              {footerResource.map(({ name, link }) => (
                <li className={"mb-2"} key={name}>
                  <Link
                    to={link}
                    className={
                      "text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                    }
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 lg:ml-auto">
            <h6 className="mb-2 font-medium text-gray-800">Company</h6>
            <ul className="text-sm">
              {footerCompany.map(({ name, link }) => (
                <li className="mb-2" key={name}>
                  <Link
                    to={link}
                    className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom area */}
      <div className="flex w-full justify-center border-t border-gray-200 p4 sm:px-6 md:py-8">
        <div className="w-full max-w-7xl px-4  sm:px-6 md:flex md:items-center md:justify-between">
          {/* Social links */}
          <ul className="mb-4 flex md:order-1 md:ml-4 md:mb-0">
            {footerSocial.map(({ path, link, name }, i) => (
              <li key={name} className={`${i === 0 ? "" : "ml-4"}`}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(link, "_blank");
                  }}
                  className="hover:bg-white-100 flex items-center justify-center rounded-full bg-white text-gray-600 shadow transition duration-150 ease-in-out hover:text-gray-900"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path d={path} transform="translate(10, 10)" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          {/* Copyrights note */}
          <div className="mr-4 text-sm text-gray-600">
            Made by{" "}
            <Link
              className="text-blue-600 hover:underline"
              target="_blank"
              to="https://github.com/Regulus55"
            >
              Regulus55
            </Link>
            . All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
