//Filters
export interface FilterPropsType {
  isLoading?: boolean;
  allCategories: string[];
  filters: filterType[];
  colors: string[];
  sizes: string[];
  setSortParams: (key: string, value: string) => void;
  deleteSortParams: (key: string) => void;
  searchParams: URLSearchParams;
  pageData?: string;
}

interface filterType {
  name: string;
}

export interface FilterProps {
  setSortParams: (key: string, value: string) => void;
  deleteSortParams: (key: string) => void;
  params: string | null;
  searchParams: URLSearchParams;
}

// prodcts
export interface ProductType {
  title: string; // Galaxy Flip6
  name?: string;
  model: string; // IJSF23-FAIONSD
  price?: number;
  referencePrice: number; // 130000
  promotionalPrice: number; // 1300000
  // category: {[key:string] : {value: string}}; // {name: "smartphone", id: "23f-23f42-23f4-23f-23f23f4"}
  category: any;
  subCategory: string; // A series
  tags: string[]; // #good #choice
  // registrationDate?: number;
  colors: string[]; // ["black", "white", "violet"],
  colorbuttons: string[]; // ["#694956", "#c0d1a5", "#3c3d3f"]
  description: string; // The latest flip-serires
  // options?: string;
  id: number; // 1
  image: string[]; // ["aa","bb","cc"]
  // details?: string;
  highlights: string[]; // ["aza","bbb","ccc"]
  inventory: number; // 152
}
