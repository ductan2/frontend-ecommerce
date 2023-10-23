import { useState } from "react";
import { Product } from "../types/product";

export const useFilter = (data: Product[]) => {
   const [selectedBrand, setSelectedBrand] = useState("");
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

   const filteredProducts = data.filter((item: Product) => {
      const brandMatch = selectedBrand ? item.brand === selectedBrand : true;
      const categoryMatch =
         selectedCategories.length === 0 ||
         selectedCategories.every((category) =>
            item.category.some((cat) => cat.title === category)
         );
      return brandMatch && categoryMatch;
   });

   return { selectedBrand, setSelectedBrand, selectedCategories, setSelectedCategories, filteredProducts };
};