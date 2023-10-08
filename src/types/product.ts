
import { UploadImageType } from "./commom";

interface ratings {
   start: number;
   comment: string;
   product_id: string; // id user comment
}
interface category {
   _id:string;
   title:string
}
export interface Product {
   _id: string;
   title: string;
   slug: string;
   description: string;
   price: number;
   brand: string;
   quantity: number;
   category: category[];
   sold: number;
   images: UploadImageType[];
   trending: boolean
   featured: boolean
   color: string[] | string;
   rating_distribution: number;
   ratings?: ratings[];
   created_at: string;
   updated_at: string;
}
