import {Menu} from "@headlessui/react";
import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, FunnelIcon} from "@heroicons/react/16/solid";
import {Icon} from "@iconify/react";
import CategorySort from "components/Product/CategorySort";
import ProductTitle from "components/ui/ProductTitle";
import useSortParams from "hooks/useSortParams";
import React, {useEffect, useRef, useState} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Link} from "react-router-dom";
import axios from "axios";
import DeleteModal from "../../components/ui/DeleteModal";
import PageDropdown from "../../components/ui/PageDropdown";
import {ProductType} from "../../utiles/interfaces";
import {SortMenu} from "../../components/ui";

interface AdminProps {
  title?: string;
  referencePrice?: number;
  promotionalPrice?: number;
  category?: string;
  subCategory?: string;
  id?: number;
  image?: string[];
  tags?: string[];
  colors?: string[];
  inventory?: number;
}

interface pageProps {
  itemCount?: number;
  page: number;
  pageCount: number;
  take: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const AdminList = ({
                     title,
                     referencePrice,
                     promotionalPrice,
                     category,
                     subCategory,
                     id,
                     image,
                     colors,
                     tags,
                     inventory,
                   }: AdminProps) => {
  const {query, searchParams, setSortParams, deleteSortParams} =
      useSortParams();
  const token = localStorage.getItem('token')

  // 페이지네이션
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pageData, setPageData] = useState<pageProps>()
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);
  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);
  const DropdownRef = useRef<HTMLDivElement>(null);

  const pageSelected = (item: number) => {
    setTake(item)
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (DropdownRef.current && !DropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
        // window.location.reload()
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // 프로덕트 데이타
  const getItemData = async () => {
    const url = `http://localhost:8000/api/product?order=ASC&page=${page}&take=${take}`
    const {data} = await axios.get(url)
    setProductData(data.body.data)
    setPageData(data.body.meta)
  }
  const [productData, setProductData] = useState<any>([]);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedItemName, setSelectedItemName] = useState<string>('');

  console.log('ProductData', productData)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (id: number, name: string) => {
    setSelectedItemId(id);
    setSelectedItemName(name)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number, name: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const url = `http://localhost:8000/api/product/${id}`
      const result = await axios.delete(url, config)
      if (result.status === 200) {
        alert(`${name} deletion successful`)
        window.location.reload()
      }
    } catch (e) {
      console.log(e)
    }
    closeModal();
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    getItemData()
  }, [take, page])


  // 필터링 및 정렬
  const [sortOption, setSortOption] = useState<string>("");
  const [sortedData, setSortedData] = useState<ProductType[]>([]);

  useEffect(() => {
    if (sortOption) {
      sortData(sortOption);
    } else {
      setSortedData(productData);
    }
  }, [productData, sortOption]);

  const sortData = (sortOption: string) => {
    let sortedProducts = [...productData];

    if (sortOption === "price-asc") {
      sortedProducts.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortOption === "price-desc") {
      sortedProducts.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    setSortedData(sortedProducts);
  };


  return (
      <div className={"bg-white"}>
        <main className={"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>

          <div className={'pt-16 pb-4 w-full flex items-start'}>
            <Link to="/product/add">
              <button
                  className="bg-violet-400 text-white border border-gray-500 rounded-full px-4 py-2">
                + Add New Product
              </button>
            </Link>
          </div>

          {/* Title, Breadcrumbs, Sort */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">

            <div className="flex w-1/3">
              {/* page title */}
              <ProductTitle title={"Product List"}/>
            </div>


            <div className={"flex items-center justify-end pb-1 w-full"}>

              <label htmlFor="search"
                     className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative w-1/2 mr-4">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input type="search" id="search"
                       className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Search" required/>
                <button type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-violet-400 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                </button>
              </div>

              {/*페이지 드롭다운*/}
              <div className={'mr-8 text-sm font-medium text-gray-700 hover:text-gray-900'}>
                Selected Items :{" "}
                <button onClick={openDropdown}
                        className="bg-violet-400 text-md font-medium text-white px-4 py-1 rounded-lg">
                  {take}
                </button>
                {isDropdownOpen && (
                    <div ref={DropdownRef}>
                      <PageDropdown
                          isOpen={isDropdownOpen}
                          onClose={closeDropdown}
                          onSelect={pageSelected}
                      />
                    </div>
                )}
              </div>


              {/*sort 드롭다운*/}
              <div>
                <SortMenu productData={productData} setSortedData={setSortedData}/>
              </div>


              <button
                  className={
                    "-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  }
              >
                <span className={"sr-only"}>Filters</span>
                <FunnelIcon className={"h-5 w-5"} aria-hidden="true"/>
              </button>
            </div>
          </div>

          {/* 밑에 상품정보부분 */}
          <div className="flex items-center justify-center mt-10">
            <table className="table-auto w-full">
              <tr className="text-center font-bold text-xl text-gray-700 border-y-4 border-gray-500">
                {/*제목부분 */}
                <td className="py-1">NO.</td>
                <td className="py-1">Images</td>
                <td className="py-1 w-28">Name</td>
                <td className="py-1">Price</td>
                <td className="py-1 w-40">Stock Status</td>
                <td className="py-1 w-16">Edit</td>
                <td className="py-1 w-16">Delete</td>
              </tr>

              {/*실제 아이템 데이터*/}
              {sortedData?.map((item: any, i: number) => (
                  <tr className="text-center" key={i}>
                    <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                      {i + 1}
                    </td>

                    <td className="flex items-center justify-center border-b border-gray-500 text-lg text-gray-700 font-bold">
                      <div className="flex items-center justify-center h-40 w-96 -space-x-12">
                        {item?.productImgs?.map((img: any, i: number) => (
                            <span
                                className={`flex items-center justify-center bg-gray-100 w-32 h-32 rounded-full shadow-md border-8 border-white z-${i + 1}`}
                                key={i}>
                                            <LazyLoadImage
                                                src={img}
                                                className={"h-auto w-auto "}
                                            />
                                                </span>
                        ))}

                      </div>
                    </td>

                    <td className="border-y border-gray-500 px-2 font-bold">
                      <p className={' text-lg text-gray-700'}>{item.name}</p>
                      <p className={'text-sm text-gray-400'}>{item.name}</p>
                    </td>

                    <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                      ₩ {Math.floor(item.price)?.toLocaleString()}
                    </td>

                    <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                      {item.stock === 0 ? (
                          <span className="bg-red-600 text-white rounded-full p-2 h-full w-20">Out of Stock</span>
                      ) : (
                          <span className="bg-green-500 text-white rounded-full p-2 w-20">On Sale</span>
                      )}
                    </td>
                    <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                      <div className={'flex items-center justify-center '}>
                        <Link
                            to={`/product/edit/${item.id}`}
                            state={{
                              title,
                              referencePrice,
                              promotionalPrice,
                              category,
                              id,
                              colors,
                              image,
                              tags,
                            }}
                        >
                          <Icon icon="fluent:edit-16-regular" width="36"/>
                        </Link>
                      </div>
                    </td>

                    <td className="border-y border-gray-500 p-2 text-lg text-gray-700 font-bold">
                      <div className={'flex items-center justify-center'}>
                        <Icon
                            icon="fluent:delete-24-regular"
                            className="cursor-pointer"
                            width="36"
                            onClick={() => openModal(item.id, item.name)}
                        />
                        {isModalOpen && selectedItemId !== null && (
                            <DeleteModal
                                onClose={closeModal}
                                onConfirm={() => handleDelete(selectedItemId, selectedItemName)}
                                productId={selectedItemId}
                                productName={selectedItemName}
                            />
                        )}
                        {/*쓰레기통*/}
                      </div>
                    </td>
                  </tr>
              ))}

            </table>
          </div>
          {/* 페이지네이션 */}
          <div className={'flex items-center justify-center mt-20'}>
            <ChevronLeftIcon
                onClick={() => {
                  window.scrollTo({top: 0, left: 0});
                  if (pageData?.hasPreviousPage) {
                    setPage(page - 1)
                  }
                }}
                className={`h-12 w-12  ${
                    pageData?.hasPreviousPage ? 'hover:cursor-pointer hover:scale-110' : 'opacity-50 pointer-events-none'
                }`} aria-hidden="true"/>

            {[...Array(pageData?.pageCount)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => {
                      setPage(index + 1);
                      window.scrollTo({top: 0, left: 0});
                    }}
                    className={`h-10 mx-1 px-4 py-2 bg-violet-300 text-md flex items-center justify-center rounded-lg ${
                        page === index + 1 ? "cursor-default scale-125 mx-2 border-2 border-gray-600 pointer-events-none" : "hover:bg-violet-400"
                    }`}
                >
                  {index + 1}
                </button>
            ))}
            <ChevronRightIcon
                onClick={() => {
                  window.scrollTo({top: 0, left: 0});
                  if (pageData?.hasNextPage) {
                    setPage(page + 1)
                  }
                }}
                className={`h-12 w-12  ${
                    pageData?.hasNextPage ? 'hover:cursor-pointer hover:scale-110' : 'opacity-50 pointer-events-none'
                }`} aria-hidden="true"/>
          </div>
        </main>
      </div>
  );
};

export default AdminList;
