import { UploadImageType } from "./commom";
import { Product } from "./product";

export type UserRegister = {
   firstname: string,
   lastname: string,
   email: string,
   password: string,
   confirmPassword: string,
   mobile: string,
}
export type UserLogin = {
   email: string,
   password: string,
}
export type Address = {
   id?: string
   province?: string
   district?: string
   wards?: string
}
export interface UserUpdate {
   firstname?: string;
   lastname?: string;
   mobile?: string;
   address?: Address;
   avatar?: UploadImageType | string;
}
export interface User {
   _id: string;
   firstname?: string;
   lastname?: string;
   email: string;
   mobile?: string;
   role?: string;
   address?: Address[];
   avatar?: UploadImageType | string;
   blocked?: boolean;
   created_at?: Date; // Có thể chuyển thành kiểu Date 
   updated_at?: Date; // Có thể chuyển thành kiểu Date 
   wishlist?: string[]; // Mảng các chuỗi
}
export type CartPayload = {
   _id: string, // product id 
   count: number,
   color: string
}
export interface CartItem {
   _id: string;
   product: Product;
   cartTotal: number;
   amount: number;
   color?: string;
   totalAfterDiscount: number;
   orderby: string;
   created_at: string;
   updated_at: string;
}