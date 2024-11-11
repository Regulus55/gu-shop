import React, { useEffect, useState } from "react";
import { FilterProps } from "utiles/interfaces";

interface SizeFilterProps extends FilterProps {
  sizes: string[];
}

const SizeFilter = ({
  sizes,
  setSortParams,
  deleteSortParams,
  params,
  searchParams,
}: SizeFilterProps) => {
  const [activeButton, setActiveButton] = useState("");

  const clicedButtonHandler = (name: string) => {
    if (name === activeButton) {
      setActiveButton("");
      deleteSortParams("size");
    } else {
      setActiveButton(name);
      setSortParams("size", name);
    }
  };

  useEffect(() => {
    setActiveButton(params ?? "");
  }, [searchParams]);

  return <div></div>;
};

export default SizeFilter;
