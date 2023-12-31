// import { useRouter } from "next/router";
import  { useState } from "react";

const Search = () => {
   const [searchTerm, setSearchTerm] = useState("");
   // const router = useRouter();

   // const handleSearch = () => {
   //    console.log("click");
   //    router.push({
   //       pathname: "/products",
   //       query: {
   //          search: searchTerm,
   //       },
   //    });
   //    setSearchTerm("");
   // };

   // const handleInput = (e) => {
   //    if (e.key === "Enter") {
   //       e.preventDefault();
   //       handleSearch();
   //    }
   // };
   return (
      <>
         <form className="w-100">
            <select defaultValue={"All Categories"} className="select-active">
               <option>All Categories</option>
               <option>Women's</option>
               <option>Men's</option>
               <option>Cellphones</option>
               <option>Computer</option>
               <option>Electronics</option>
               <option> Accessories</option>
               <option>Home & Garden</option>
               <option>Luggage</option>
               <option>Shoes</option>
               <option>Mother & Kids</option>
            </select>
            <input
               value={searchTerm}
               // onKeyDown={handleInput}
               onChange={(e) => setSearchTerm(e.target.value)}
               type="text"
               placeholder="Search items..."
            />
         </form>
      </>
   );
};

export default Search;
