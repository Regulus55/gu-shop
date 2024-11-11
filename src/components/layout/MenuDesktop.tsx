import {Dispatch, forwardRef, Fragment, SetStateAction, useEffect, useState} from "react";
import {Link, NavigateFunction} from "react-router-dom";
import {Bars3Icon, ShoppingBagIcon} from "@heroicons/react/16/solid";
import {FaShopify} from "react-icons/fa";
import {Popover, Transition} from "@headlessui/react";
import {headerData} from "data/layout/LayoutData";
import {LazyLoadImage} from "react-lazy-load-image-component";
import axios from "axios";

interface profileType {
    username: string;
    id: string;
    profileImg: string;
    roles?: string[];
}

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
            // logout,
            isAdmin,
            onMouseEnter,
            onMouseLeave,
        },
        ref
    ) => {
        const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
        const logout = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
                const url = "http://localhost:8000/api/auth/logout"
                const result = await axios.post(url, {}, config)
                // console.log('logout result', result)
                localStorage.removeItem('token')
                setIsLoggedIn(false)
                if (result.status === 201) {
                    window.location.reload()
                    alert('Logout succeeded')
                }
            } catch (e) {
                console.log('logout error', e)
            }
        }

        const [profileInfo, setProfileInfo] = useState<profileType | null>(null)
        const getProfileInfo = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
                const url = "http://localhost:8000/api/auth"
                const result = await axios.get(url, config)
                console.log('get profile info result', result.data.body)
                setProfileInfo(result.data.body)
            } catch (e) {
                console.log('getProfile info error', e)
            }
        }

        useEffect(() => {
            if (isLoggedIn) {
                getProfileInfo()
            }
        }, [])



        return (
            <nav className="relative bg-slate-100">
                <div
                    aria-label="Top"
                    className="mx-auto max-w-7xl border-gray-200 bg-slate-100 px-4 sm:px-6 lg:px-8"
                >
                    <div className="flex h-16 items-center">
                        <button
                            type="button"
                            className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                        >
                            <span className="sr-only">Open Menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                        </button>

                        <div className="ml-4 flex lg:ml-0">
                            <Link to="/" className="flex items-center">
                                <FaShopify size="48px" color="#885CF6" className="pb-2"/>
                                <span className="text-2xl font-bold text-violet-500 pb-2 tracking-tight">
                  GUshop
                </span>
                            </Link>
                        </div>

                        <Popover.Group className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="flex h-full space-x-8">
                                {headerData.categories.map((category) => (
                                    <Popover key={category.name} className="flex">
                                        {({open}: { open: boolean }) => (
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
                                                    <Popover.Panel
                                                        className="absolute inset-0 top-full border-t-[1px] border-gray-200 text-sm text-gray-500">
                                                        <div
                                                            className="absolute inset-0 top-1/2 bg-white shadow"
                                                            aria-hidden="true"
                                                        />

                                                        <div className="relative bg-white">
                                                            <div className="mx-auto max-w-7xl px-8">
                                                                <div
                                                                    className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                    <div
                                                                        className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                        {category.featured.map((item) => (
                                                                            <div
                                                                                key={item.name}
                                                                                className="group relative text-base sm:text-sm"
                                                                            >
                                                                                <div
                                                                                    className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
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

                                                                    <div
                                                                        className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
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
                                        to={"/Product/new"}
                                        className={
                                            "flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        }
                                    >
                                        New Item
                                    </Link>
                                )}
                            </div>
                        </Popover.Group>

                        <div className={"ml-auto flex items-center"}>
                            <div
                                className={
                                    "hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
                                }
                            >
                                <div
                                    className={
                                        "hidden items-center justify-end md:flex md:flex-1"
                                    }
                                ></div>
                            </div>
                        </div>

                        {isLoggedIn ? (
                            <div className={'flex items-center justify-center'}>
                                <Link
                                    to="/profile"
                                    className="flex space-x-2  h-6 text-sm font-medium text-gray-700 hover:text-gray-800"
                                >
                                    <img
                                        // src={profileInfo?.profileImg ? profileInfo?.profileImg : '/images/default_image.webp'}
                                        src={'/images/default_image.webp'}
                                        alt={""}
                                        className={'h-8 -my-1.5 text-sm font-medium text-gray-700 hover:text-gray-800 rounded-2xl'}
                                    />
                                    <div
                                        className={'h-8 -my-1 text-lg font-medium text-gray-800 underline decoration-1'}
                                    >
                                        {profileInfo?.username}
                                    </div>
                                    {profileInfo?.roles?.includes('admin') ? (
                                        <span className={'-my-1 text-red-500 text-xs'}>Admin</span>
                                    ) : (null)}
                                </Link>
                                <span className="h-6 w-px mr-4" aria-hidden="true"/>

                                <div
                                    onClick={logout}
                                    className={'h-6 text-sm font-medium text-gray-700 hover:text-gray-800 hover:cursor-pointer'}
                                >
                                    Logout
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                >
                                    Login{" "}
                                </Link>
                                <span className="h-6 w-px bg-gray-200 mr-4" aria-hidden="true"/>
                                <Link
                                    to="/signup"
                                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}


                        {/* Cart */}
                        <div className="ml-4 flow-root lg:ml-6">
                            <Link to="/carts" className="group -m-2 flex items-center p-2">
                                <ShoppingBagIcon
                                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                {/*<CartStatus/>*/}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
);

export default MenuDesktop;
