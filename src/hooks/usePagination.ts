import { useCallback, useState } from "react";

export const usePagination = (totalItem: number, itemPerPage: number) => {
   const [currentPage, setCurrentPage] = useState(1);
   const pages = Math.ceil(totalItem / itemPerPage);

   const next = useCallback(() => setCurrentPage((prev: number) => prev + 1), []);
   const prev = useCallback(() => setCurrentPage((prev: number) => prev - 1), []);
   return { currentPage, pages, next, prev ,setCurrentPage};
};