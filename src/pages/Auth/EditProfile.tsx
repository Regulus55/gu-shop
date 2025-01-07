import React, { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProductTitle } from "components/ui";
import UpdateImage from "components/layout/UpdateImage";

interface profileType {
  username: string;
  id: string;
  profileImg: string;
  email: string;
  profileImage?: File | null;
  //   image?: string | Blob | File;
}

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
      console.log("Profile Info", result.data.body);
      console.log("profile image", result.data.body?.profileImg);
    } catch (e) {
      console.log(e);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<profileType>({
    // mode: "onSubmit",
    // defaultValues: {
    //   username: "ahri",
    //   id: "ksdjflsdjf3-sadf",
    //   email: "abc@abc.com",
    //   image: null,
    // },
  });
  useEffect(() => {
    if (profileInfo) {
      setValue("username", profileInfo?.username);
      setValue("email", profileInfo?.email);
      // setValue('image',photoImg[0])
    }
  }, [profileInfo]);

  // 프로필 이미지
  const handleFileUpload = (file: File) => {
    setValue("profileImage", file);
  };

  //  프로필수정 제출
  const submit = async (data: any) => {
    const formData = new FormData();
    formData.append("file", data.profileImage);

    const userInput = {
      username: data.username,
      email: data.email,
      image: data.profileImage,
    };
    console.log("userInput", userInput);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = "http://localhost:8000/api/user";
      const result = await axios.put(url, userInput, config);
      console.log("result", result);
      if (result.status === 200) {
        alert("Personal Information Successfully Editted");
      }
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
            <ProductTitle title={"Edit My Profile"} />
          </div>
        </div>

        {/* 왼쪽 nav */}
        <section aria-labelledby={"products-heading"} className={"pt-6 pb-24"}>
          <div className={"grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4"}>
            <div className="hidden lg:block">
              <h3 className="sr-only">edit profile</h3>
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
            <form
              onSubmit={handleSubmit(submit)}
              className="col-span-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 grid w-full h-full pl-16 pr-4"
            >
              {/* 유저정보 */}
              <div className="col-span-1 lg:col-span-2 grid-cols-4 lg:grid-cols-5 flex items-center justify-center order-2 md:order-1 w-full h-16 grid">
                <div className="col-span-2 lg:col-span-2 flex items-center justify-center md:justify-start text-xl h-12 font-medium text-gray-700">
                  Username :{" "}
                </div>
                <input
                  {...register("username")}
                  type="text"
                  placeholder={profileInfo?.username}
                  className="col-span-2 lg:col-span-3 bg-white border-gray-500 rounded-lg w-full h-10 p-2 rounded text-xl text-gray-700 font-bold"
                />

                <div className="col-span-2 flex items-center justify-center md:justify-start text-xl h-12 font-medium text-gray-700">
                  Email :{" "}
                </div>
                <input
                  {...register("email")}
                  type="text"
                  placeholder={profileInfo?.email}
                  className="col-span-2 lg:col-span-3 bg-white border-gray-500 rounded-lg w-full h-10 p-2 rounded text-xl text-gray-700 font-bold"
                />

                {/* 제출버튼 */}
                <div className="col-span-5 w-full flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-violet-500 text-xl text-white w-2/3 mt-8 font-medium border border-gray-500 px-4 py-2 rounded-lg hover:bg-violet-600"
                  >
                    Submit Profile
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:order-3 lg:order-2" />

              {/* 유저이미지 */}
              <div className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center px-4 order-1 md:order-2 flex justify-center mb-16 ">
                <LazyLoadImage
                  src="/images/default_image.webp"
                  className="w-56 h-56 mb-6 rounded-full"
                />
                {/* <button
                  className="bg-gray-300 text-white font-medium border border-gray-500 px-4 py-2 rounded-lg hover:bg-violet-600"
                  onClick={() => console.log("upload file")}
                >
                  Upload Image
                </button> */}

                <UpdateImage onFileUpload={handleFileUpload} />
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditProfile;
