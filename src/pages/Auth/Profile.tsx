import React, { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

interface profileType {
  username: string;
  id: string;
  profileImg: string;
  email: string;
}

const Profile = () => {
  const navigate = useNavigate();

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
    <div className={"w-full h-full py-10 grid grid-cols-5 lg:grid-cols-11"}>
      <div className={"lg:col-span-1"} />

      {/*왼쪽박스*/}
      <div
        className={
          "border-2 border-gray-400 p-8 rounded-lg col-span-3 m-6 max-w-md"
        }
      >
        <div className={"flex justify-center "}>
          <LazyLoadImage
            // src={profileInfo?.profileImg ? profileInfo.profileImg : '/images/default_image.webp'}
            src={"/images/default_image.webp"}
            alt="Profile Image"
            className={"h-full w-full rounded-lg border border-gray-600 "}
          />
        </div>

        <div className={"flex flex-col items-center justify-center mt-4"}>
          <button
            onClick={() => navigate("/edit/profile")}
            className={
              "text-lg font-medium bg-violet-500 text-gray-200 w-full border border-gray-600 rounded-lg p-2 active:bg-violet-400 duration-100"
            }
          >
            Edit Personal Information
          </button>

          <button
            onClick={() => navigate("/change/password")}
            className={
              "text-lg font-medium bg-violet-500 text-gray-200 w-full border border-gray-600 rounded-lg p-2 mt-2 active:bg-violet-400 duration-100"
            }
          >
            Change Password
          </button>

          <button
            // onClick={() => navigate("/change/password")}
            className={
              "text-lg font-medium bg-red-500 text-gray-200 w-full border border-gray-600 rounded-lg p-2 mt-4 active:bg-red-400 duration-100"
            }
          >
            Cancel Membership
          </button>
        </div>
      </div>

      {/*오른쪽박스*/}
      <div
        className={
          "border-2 border-gray-400 px-16 py-8 rounded-lg col-span-6 m-6"
        }
      >
        {/* username */}
        <div className={"grid grid-cols-5 justify-start items-center mb-4"}>
          <div
            className={
              "col-span-2 text-2xl md:text-3xl lg:text-3xl w-80 text-gray-700 font-bold "
            }
          >
            Username :
          </div>
          <input
            type="text"
            value={profileInfo?.username}
            disabled
            className="col-span-3 bg-white border-none w-full p-2 rounded text-2xl md:text-3xl lg:text-3xl text-gray-700 font-bold"
          />
        </div>

        {/* email */}
        <div className={"grid grid-cols-5 justify-start items-center mb-4"}>
          <div
            className={
              "col-span-2 text-2xl md:text-3xl lg:text-3xl w-80 text-gray-700 font-bold "
            }
          >
            Email :
          </div>
          <input
            type="text"
            value={profileInfo?.email}
            disabled
            className="col-span-3 bg-white border-none w-full p-2 rounded text-2xl md:text-3xl lg:text-3xl text-gray-700 font-bold"
          />
        </div>
      </div>

      <div className={"lg:col-span-1"} />
    </div>
  );
};

export default Profile;
