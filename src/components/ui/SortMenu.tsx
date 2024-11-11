import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ProductType } from "../../utiles/interfaces";

interface SortMenuProps {
    productData: ProductType[];
    setSortedData: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const SortMenu: React.FC<SortMenuProps> = ({ productData, setSortedData }) => {
    const [sortCriteria, setSortCriteria] = useState("recommended");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 가격정렬
    const sortData = (data: ProductType[], criteria: string): ProductType[] => {
        switch (criteria) {
            case "priceLowToHigh":
                return [...data].sort((a, b) => {
                    const priceA = a.price ?? 0;
                    const priceB = b.price ?? 0;
                    return priceA - priceB;
                });
            case "priceHighToLow":
                return [...data].sort((a, b) => {
                    const priceA = a.price ?? 0;
                    const priceB = b.price ?? 0;
                    return priceB - priceA;
                });
            case "recommended":
            default:
                return data;
        }
    };

    // 정렬기준변경
    const handleSortChange = (criteria: string) => {
        setSortCriteria(criteria);
        const sorted = sortData(productData, criteria);
        setSortedData(sorted);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // 드롭다운 바깥 클릭 시 드롭다운 닫기
    useEffect(() => {
        // 바깥쪽 클릭을 감지하는 함수
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false); // 바깥을 클릭하면 드롭다운 닫기
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <button
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    onClick={toggleDropdown}
                >
                    Sort
                    <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <button
                            onClick={() => handleSortChange("recommended")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-400 w-full"
                        >
                            Relevance
                        </button>
                        <button
                            onClick={() => handleSortChange("priceLowToHigh")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-400 w-full"
                        >
                            Price : Low to High
                        </button>
                        <button
                            onClick={() => handleSortChange("priceHighToLow")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-400 w-full"
                        >
                            Price : High to Low
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortMenu;