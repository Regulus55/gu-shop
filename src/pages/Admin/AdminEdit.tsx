import { Icon } from "@iconify/react";
import ProductTitle from "components/ui/ProductTitle";
import { accessory, computer, smartphone } from "data/Products/CollectionsData";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ProductType } from "utiles/interfaces";
import axios from "axios";
import { EditModal } from "../../components/ui";

interface CategoryType {
  name: string;
  id: number | string;
}

interface AdminProps {
  title?: string;
  name?: string;
  referencePrice?: number;
  promotionalPrice?: number;
  price?: number;
  description?: string;
  category?: CategoryType;
  subCategory?: string;
  id?: string;
  image?: string[];
  tags?: string[];
  colors?: string[];
  highlights?: string[];
  colorbuttons?: string[];
  inventory?: number;
}

const AdminEdit = () => {
  const params = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { isSubmitting, errors, isDirty },
  } = useForm();

  const getProductData = async () => {
    try {
      const url = `http://localhost:8000/api/product/${params.id}`;
      const { data } = await axios.get(url);
      console.log("product Data", data.body);
      setProductData(data.body);
    } catch (e) {
      console.log("eeeeee", e);
    }
  };
  const [productData, setProductData] = useState<AdminProps | null>(null);

  // Category
  const getCategoryData = async () => {
    const { data } = await axios.get("http://localhost:8000/api/category");
    setCategoryInfo(data.body);
  };
  const [categoryInfo, setCategoryInfo] = useState<CategoryType[]>([]);
  const categorySample: { [key: string]: string[] } = {
    smartphone: ["A series", "S series", "Flip series", "Fold series"],
    computer: ["Tab series", "Book series"],
    accessory: ["Watch series", "Buds series", "Ring series"],
  };
  const [selectedCategoryName, setSelectedCategoryName] = useState(
    productData?.category?.name
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    "fca15230-e867-4a9a-a17f-557c5f5e33d2"
  );
  const options = selectedCategoryName
    ? Object.keys(categorySample[selectedCategoryName])
    : [];
  const handleCategoryChange = (e: any) => {
    // setSelectedCategoryName(e.target.value);

    // 선택된 category 의 id 찾기
    const selectedCategoryInfo = categoryInfo.find(
      (category) => category.name === e.target.value
    );
    if (selectedCategoryInfo) {
      setSelectedCategoryId("dd");
    }
  };

  const [photoImg, setPhotoImg] = useState<any>([]);
  const [photoFile, setPhotoFile] = useState<any>([]);
  // const files = watch("images");
  // if (files && files.length > 0) {
  //     const fileURL = URL.createObjectURL(files[0]);
  //     if (fileURL !== photoImg) setPhotoFile(fileURL);
  // }

  // 이미지
  const [imagePreviews, setImagePreviews] = useState<string[]>([
    "/images/default_image.webp",
  ]);
  const watchFiles = watch("productImgs");
  useEffect(() => {
    if (watchFiles && watchFiles.length > 0) {
      // 이미지파일 변경되면 화면에 표시
      const previews = Array.from(watchFiles).map((file) =>
        URL.createObjectURL(file as File)
      );
      setImagePreviews(previews);

      return () => {
        previews.forEach((preview) => URL.revokeObjectURL(preview));
      };
    }
  }, [watchFiles]);

  // input
  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });
  const handleAddColor = () => {
    appendColor("");
  };
  const handleRemoveColor = (index: number) => {
    removeColor(index); // 인덱스에 해당하는 필드 제거
  };

  // const {fields: colorbuttonFields, append: appendColorbutton} =
  //     useFieldArray({
  //         control,
  //         name: "colorbuttons",
  //     });
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });
  const handleAddTag = () => {
    appendTag("");
  };
  const handleRemoveTag = (index: number) => {
    removeTag(index); // 인덱스에 해당하는 필드 제거
  };

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control,
    name: "highlights",
  });
  const handleAddHighlight = () => {
    appendHighlight("");
  };
  const handleRemoveHighlight = (index: number) => {
    removeHighlight(index); // 인덱스에 해당하는 필드 제거
  };

  // categories, subcategories
  const categories: { [key: string]: string[] } = {
    smartphone: ["A series", "S series", "Flip series", "Fold series"],
    computer: ["Tab series", "Book series"],
    accessory: ["Watch series", "Buds series", "Ring series"],
  };
  // const [selectedCategory, setSelectedCategory] = useState(
  //   productInfo?.category || ""
  // );
  // const [selectedSubCategory, setSelectedSubCategory] = useState(
  //   productInfo?.subCategory || ""
  // );
  // const options = Object.keys(categories[selectedCategory]);
  // const options = categories[selectedCategory] ? Object.keys(categories[selectedCategory]) : [];
  //
  // const handleCategoryChange = (e: any) => {
  //   setSelectedCategory(e.target.value);
  // };
  // const handleSubCategoryChange = (e: any) => {
  //   setSelectedSubCategory(e.target.value);
  // };

  // 모달
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const example = () =>{
  //     console.log('모달확ㅇ;ㄴ')
  // }

  // 제출
  const submit = async (data: any) => {
    const productImgsArray = Array.from(data.productImgs || []);
    // 이미지파일을 array로 만듦, undefined 대비해 빈배열 || 로 만듦

    const userInput = {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      tags: data.tags,
      options: "options",
      details: "details",
      colors: data.colors,
      stock: 1,
      highlights: data.highlights,
      productImgs: productImgsArray,
      category: data.category ? JSON.parse(data.category) : null,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // const url = `http://localhost:8000/api/product/${params.id}`
      // const result = await axios.put(url, userInput, config);
      // if (result.status === 200) {
      //     alert('수정성공')
      //     navigate('/product/new')
      // }
      // console.log('resutlttt', result)
      console.log("edit userInput", userInput);
    } catch (e) {
      console.log(e);
    }
  };

  // 데이터 가져오고 넣기
  useEffect(() => {
    getProductData();
    getCategoryData();
  }, []);
  useEffect(() => {
    if (productData) {
      setValue("colors", productData.colors);
      setValue("highlights", productData.highlights);
      setValue("tags", productData.tags);

      setValue("name", productData.name);
      setValue("id", productData.id);
      setValue("price", productData.price);
      setValue("description", productData.description);
      // setValue('productImgs',productData?.productImgs[0])
    }
  }, [productData, setValue]);

  if (!productData) {
    return <div>Loading..</div>;
  }
  return (
    <div className={"bg-white"}>
      <form
        onSubmit={handleSubmit(submit)}
        className={"mx-auto mb-32 max-w-7xl px-4 sm:px-6 lg:px-8"}
      >
        {/* Title, Breadcrumbs, Sort */}
        <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
          <div className="flex flex-col">
            <ProductTitle title={"Edit Product"} />
          </div>
        </div>

        {/* 아래내용 */}
        <div className="flex flex-col items-center justify-center px-40 mt-10">
          <div className="grid grid-cols-10 w-full">
            <div className="col-span-4 flex flex-col items-center">
              {/*<img src={photoImg} className="h-60 w-60"/>*/}
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="h-60 w-60 object-cover"
                />
              ))}
              <div className="flex flex-col items-center justify-end text-gray-500 mt-2">
                <input
                  {...register("productImgs")}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  multiple
                />
                <div>JPG, JPEG, PNG, or WEBP</div>
              </div>
            </div>

            <div className="col-span-6 flex flex-col justify-evenly">
              <div className="flex w-full px-5">
                <h3 className="w-60 font-bold text-2xl text-gray-700">Name</h3>
                <div className="w-full">
                  <input
                    className="h-12 w-full border-2 border-gray-300 rounded-lg"
                    {...register("name")}
                    placeholder={productData?.name}
                  />
                </div>
              </div>

              {/*<div className="flex w-full px-5">*/}
              {/*    <h3 className="w-60 font-bold text-2xl text-gray-700">Model</h3>*/}
              {/*    <div className="w-full">*/}
              {/*        <input*/}
              {/*            className="h-12 w-full border-2 border-gray-300 rounded-lg"*/}
              {/*            {...register("model")}*/}
              {/*            // placeholder={productData?.model}*/}
              {/*            placeholder={'Model'}*/}
              {/*        />*/}
              {/*    </div>*/}
              {/*</div>*/}

              <div className="flex w-full px-5">
                <h3 className="w-60 font-bold text-2xl text-gray-700">ID</h3>
                <div className="w-full">
                  <textarea
                    className="h-14 w-full border-2 border-gray-300 rounded-lg"
                    {...register("id")}
                    placeholder={String(productData?.id)}
                    disabled
                  />
                </div>
              </div>

              <div className="flex w-full px-5">
                <h3 className="w-60 font-bold text-2xl text-gray-700">
                  Inventory
                </h3>
                <div className="w-full">
                  <input
                    className="h-12 w-full border-2 border-gray-300 rounded-lg"
                    {...register("inventory")}
                    // placeholder={productInfo?.inventory?.toString()}
                    placeholder={"Inventory"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*<div className="flex w-full p-3">*/}
          {/*    <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">*/}
          {/*        Reference Price*/}
          {/*    </h3>*/}
          {/*    <div className="w-full">*/}
          {/*        <input*/}
          {/*            className="h-12 w-full border-2 border-gray-300 rounded-lg"*/}
          {/*            {...register("referencePrice")}*/}
          {/*            // placeholder={`₩ ${productInfo?.referencePrice*/}
          {/*            //   .toLocaleString()*/}
          {/*            //   .toString()}`}*/}
          {/*            placeholder={'Reference Price'}*/}
          {/*        />*/}
          {/*    </div>*/}
          {/*</div>*/}

          <div className="flex w-full p-3">
            <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
              {/*Promotional */}
              Price
            </h3>
            <div className="w-full">
              <input
                className="h-12 w-full border-2 border-gray-300 rounded-lg"
                {...register("promotionalPrice")}
                placeholder={`₩ ${String(
                  productData?.price?.toLocaleString()
                )}`}
              />
            </div>
          </div>

          <div className="flex w-full p-3">
            <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
              Description
            </h3>
            <div className="w-full">
              <textarea
                {...register("description")}
                className="h-32 w-full border-2 border-gray-300 rounded-lg"
                placeholder={productData?.description}
              />
            </div>
          </div>

          <div className="flex w-full p-3">
            <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
              Category
            </h3>
            <div className="w-full">
              <select
                {...register("category")}
                className="h-12 w-full border-2 border-gray-300 rounded-lg"
                onChange={handleCategoryChange}
              >
                {categoryInfo?.map((category) => (
                  <option
                    key={category.id}
                    value={JSON.stringify({
                      id: category.id,
                      name: category.name,
                    })}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/*<div className="flex w-full p-3">*/}
          {/*    <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">*/}
          {/*        SubCategory*/}
          {/*    </h3>*/}
          {/*    <div className="w-full">*/}
          {/*        <select*/}
          {/*            {...register("subCategory")}*/}
          {/*            className="h-12 w-full border-2 border-gray-300 rounded-lg"*/}
          {/*            // onChange={handleSubCategoryChange}*/}
          {/*        >*/}
          {/*            /!*{options.map((option: any) => (*!/*/}
          {/*            /!*  <option key={option} defaultValue={option}>*!/*/}
          {/*            /!*    {categories[selectedCategory][option]}*!/*/}
          {/*            /!*  </option>*!/*/}
          {/*            /!*))}*!/*/}
          {/*        </select>*/}
          {/*    </div>*/}
          {/*</div>*/}

          <div className="flex w-full p-3">
            <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
              Colors
            </h3>
            <div className="w-full">
              {colorFields.map((field, index) => (
                <>
                  <input
                    key={field.id}
                    {...register(`colors.${index}`)}
                    className="h-12 w-3/4 border-2 border-gray-300 rounded-lg"
                    placeholder={productData?.colors?.[index] || "New Color"}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(index)}
                    className="bg-gray-500 text-white p-2 ml-2 rounded-lg mt-2"
                  >
                    Remove
                  </button>
                </>
              ))}
              <button
                type="button"
                onClick={handleAddColor}
                className="bg-gray-500 text-white p-2 rounded-lg mt-2"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex w-full p-3">
            <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
              Color Buttons
            </h3>
            <div className="w-full">
              {/*{colorbuttonFields.map((field, index) => (*/}
              {/*    <input*/}
              {/*        key={field.id}*/}
              {/*        {...register(`colorbuttons.${index}`)}*/}
              {/*        className="h-12 w-full border-2 border-gray-300 rounded-lg"*/}
              {/*        placeholder={productInfo?.colorbuttons?.[index]}*/}
              {/*    />*/}
              {/*))}*/}
            </div>
          </div>

          <div className="flex w-full p-3">
            <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
              Highlights
            </h3>
            <div className="w-full">
              {highlightFields.map((field, index) => (
                <>
                  <textarea
                    key={field.id}
                    {...register(`highlights.${index}`)}
                    className="h-20 w-3/4  border-2 border-gray-300 rounded-lg"
                    placeholder={
                      productData?.highlights?.[index] || "New Highlight"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(index)}
                    className="bg-gray-500 text-white p-2 ml-2 rounded-lg mt-2"
                  >
                    Remove
                  </button>
                </>
              ))}
              <button
                type="button"
                onClick={handleAddHighlight}
                className="bg-gray-500 text-white p-2 rounded-lg mt-2"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex w-full p-3">
            <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
              Tags
            </h3>
            <div className="w-full">
              {tagFields.map((field, index) => (
                <>
                  <input
                    key={field.id}
                    {...register(`tags.${index}`)}
                    className="h-12 w-3/4 border-2 border-gray-300 rounded-lg"
                    placeholder={productData?.tags?.[index]}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="bg-gray-500 text-white p-2 ml-2 rounded-lg mt-2"
                  >
                    Remove
                  </button>
                </>
              ))}
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-gray-500 text-white p-2 rounded-lg mt-2"
              >
                Add
              </button>
            </div>
          </div>

          <button
            type={"submit"}
            // onClick={()=>setIsModalOpen(true)}
            className="bg-gray-300 border-gray-500 rounded-lg text-2xl p-4 mt-6 hover:cursor-pointer"
          >
            Edit Product
          </button>
          {/*{isModalOpen && (*/}
          {/*    <EditModal*/}
          {/*        onClose={() => setIsModalOpen(false)}*/}
          {/*        onConfirm={example}*/}
          {/*    />*/}
          {/*)}*/}
        </div>
      </form>
    </div>
  );
};

export default AdminEdit;
