import { Menu } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react";
import CategorySort from "components/Product/CategorySort";
import ProductTitle from "components/ui/ProductTitle";
import useSortParams from "hooks/useSortParams";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import { ProductType } from "utiles/interfaces";
import axios from "axios";
import DeleteModal from "../../components/ui/DeleteModal";
import { accessory, computer, smartphone } from "data/Products/CollectionsData";

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
  const { query, searchParams, setSortParams, deleteSortParams } =
    useSortParams();
  const token = localStorage.getItem("token");

  const [productss, setProductss] = useState<ProductType[]>([
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
  const getItemData = async () => {
    try {
      // const url = "http://localhost:8000/api/product?order=ASC&page=1&take=20";
      const url = "http://localhost:8000/api/product?order=DESC&page=1&take=10"
      const { data } = await axios.get(url);
      setProductData(data.body.data);
    } catch (e) {
      console.log(e);
    }
  };
  const [productData, setProductData] = useState<any>([]);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  console.log("ProductData", productData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (id: number, name: string) => {
    setSelectedItemId(id);
    setSelectedItemName(name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number, name: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `http://localhost:8000/api/product/${id}`;
      const result = await axios.delete(url, config);
      if (result.status === 200) {
        alert(`${name} deletion successful`);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
    closeModal();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getItemData();
  }, []);

  return (
    <div className={"bg-white"}>
      <main className={"mx-auto mb-32 max-w-7xl px-4 sm:px-6 lg:px-8"}>
        {/* Title, Breadcrumbs, Sort */}
        <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
          <div className="flex flex-col">
            {/* page title */}
            <ProductTitle title={"Product List"} />
          </div>
          <div className={"flex items-center"}>
            <Link to="/product/add">
              <button className="bg-gray-300 border-gray-500 rounded-lg p-2 mr-8">
                Add Product
              </button>
            </Link>

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

        {/* 밑에 상품정보부분 */}
        <div className="flex items-center justify-center px-40 mt-10">
          <table className="table-auto w-full">
            <tr className="text-start font-bold text-xl text-gray-700 border-y-4 border-gray-500">
              {/*제목부분 */}
              <td className="p-2">NO.</td>
              <td className="p-2 pl-12">Product</td>
              <td className="p-2">Price</td>
              <td className="p-2">Inventory</td>
              <td className="p-2">Edit</td>
              <td className="p-2">Delete</td>
            </tr>

            {/*실제 아이템 데이터*/}
            {productData?.map((item: any, i: number) => (
              <tr className="text-start" key={i}>
                <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                  {i + 1}
                </td>
                <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                  <div className="flex items-center justify-start">
                    <LazyLoadImage
                      src={item?.productImgs[0]}
                      alt={title}
                      className={"h-32 w-32"}
                    />
                    {item.name}
                  </div>
                </td>

                <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                  ₩ {Math.floor(item.price)?.toLocaleString()}
                </td>
                <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                  {/*{item.inventory}*/}
                  {/*152*/}
                  {item.stock}
                </td>
                <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                  <div>
                    <div>
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
                        <Icon icon="fluent:edit-16-regular" width="36" />
                      </Link>
                    </div>
                  </div>
                </td>

                <td className="border-y border-gray-500 p-2 text-lg text-gray-700 font-bold">
                  <div>
                    <Icon
                      icon="fluent:delete-24-regular"
                      className="cursor-pointer"
                      width="36"
                      onClick={() => openModal(item.id, item.name)}
                    />
                    {isModalOpen && selectedItemId !== null && (
                      <DeleteModal
                        onClose={closeModal}
                        onConfirm={() =>
                          handleDelete(selectedItemId, selectedItemName)
                        }
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
      </main>
    </div>
  );
};

export default AdminList;
