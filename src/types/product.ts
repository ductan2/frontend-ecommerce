
import { UploadImageType } from "./commom";
import { User } from "./user";

export interface ratings {
   star: number;
   comment: string;
   postedBy: User; // id user comment
   posted_at: string;
}
interface category {
   _id: string;
   title: string
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
   color: { _id: string, title: string }[]
   rating_distribution: number;
   ratings?: ratings[];
   created_at: string;
   updated_at: string;
}
