import {useEffect, useState} from "react";
import axios from "axios";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useLocation, useNavigate} from "react-router-dom";
import FilterDesktop from "components/Product/FilterDesktop";
import {ChevronDownIcon, FunnelIcon} from "@heroicons/react/16/solid";
import CategorySort from "components/Product/CategorySort";
import {Menu} from "@headlessui/react";
import {ProductTitle} from "components/ui";
import useSortParams from "hooks/useSortParams";
import {COLLECTION, FILTERS} from "data/Products";
import {register} from "swiper/element/swiper-element";
import {useForm} from "react-hook-form";

interface profileType {
    username: string;
    id: string;
    profileImg: string;
    email: string;
}

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {query, searchParams, setSortParams, deleteSortParams} =
        useSortParams();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
        }
    }, []);

    // 프로파일정보
    const [profileInfo, setProfileInfo] = useState<profileType | null>(null);
    const getProfileData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };
            const result = await axios.get("http://localhost:8000/api/auth", config);
            setProfileInfo(result.data.body);
            console.log("result", result.data.body);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getProfileData();
    }, []);

    return (
        <div className={"bg-white"}>
            <main className={"mx-auto mb-32 max-w-7xl px-4 sm:px-6 lg:px-8"}>
                {/* Title, Breadcrumbs, Sort */}
                <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
                    <div className="flex flex-col">
                        {/* page title */}
                        <ProductTitle title={"Profile"}/>
                    </div>
                </div>

                {/* 왼쪽 버튼 */}
                <section aria-labelledby={"products-heading"} className={"pt-6 pb-24"}>
                    <div className={"grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4"}>
                        <div className="hidden lg:block">
                            <h3 className="sr-only">profile</h3>
                            <ul
                                role="list"
                                className="space-y-6 border-b border-gray-200 pb-6 text-md font-medium text-gray-900"
                            >
                                <li>
                                    <button
                                        className={`hover:text-gray-500 ${
                                            location.pathname.includes("profile") &&
                                            !location.pathname.includes("edit")
                                                ? "text-violet-500"
                                                : ""
                                        }`}
                                        onClick={() => navigate("/profile")}
                                    >
                                        Profile
                                    </button>
                                </li>

                                <li>
                                    <button
                                        className={`hover:text-gray-500 ${
                                            location.pathname?.includes("profile") &&
                                            location.pathname?.includes("edit")
                                                ? "text-violet-500"
                                                : ""
                                        }`}
                                        onClick={() => navigate("/edit/profile")}
                                    >
                                        Edit My Profile
                                    </button>
                                </li>

                                <li>
                                    <button
                                        className={`hover:text-gray-500`}
                                        onClick={() => navigate("/change/password")}
                                    >
                                        Change Password
                                    </button>
                                </li>

                                <li>
                                    <button
                                        className={`hover:text-gray-500`}
                                        onClick={() => console.log("cancel membership")}
                                    >
                                        Cancel Membership
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* 오른쪽 내용 */}
                        <div
                            className="col-span-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 grid w-full h-full pl-16 pr-4">
                            {/* 유저정보 */}
                            <div
                                className="col-span-1 lg:col-span-2 grid-cols-4 lg:grid-cols-5 flex items-center justify-center order-2 md:order-1 w-full h-16 grid">
                                <div
                                    className="col-span-2 lg:col-span-2 flex items-center justify-center md:justify-start text-xl h-12 font-medium text-gray-700">
                                    Username :{" "}
                                </div>
                                <input
                                    type="text"
                                    value={profileInfo?.username}
                                    className="col-span-2 lg:col-span-3 bg-white border-white rounded-lg w-full h-10 p-2 rounded text-xl text-gray-700 font-bold"
                                />

                                <div
                                    className="col-span-2 flex items-center justify-center md:justify-start text-xl h-12 font-medium text-gray-700">
                                    Email :{" "}
                                </div>
                                <input
                                    type="text"
                                    value={profileInfo?.email}
                                    className="col-span-2 lg:col-span-3 bg-white border-white rounded-lg w-full h-10 p-2 rounded text-xl text-gray-700 font-bold"
                                />
                            </div>

                            <div className="col-span-1 md:order-3 lg:order-2"/>

                            {/* 유저이미지 */}
                            <div
                                className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center px-4 order-1 md:order-2 flex justify-center mb-16 ">
                                <LazyLoadImage
                                    src="/images/default_image.webp"
                                    className="w-56 h-56 mb-6 rounded-full"
                                />
                                <button
                                    className="bg-violet-500 text-white font-medium border border-gray-500 px-4 py-2 rounded-lg hover:text-gray-200"
                                    onClick={() => navigate("/edit/profile")}
                                >
                                    Edit My Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Profile;
