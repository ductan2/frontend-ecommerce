export type UserRegister ={
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
export interface User {
   _id: string;
   firstname?: string;
   lastname?: string;
   email: string;
   mobile?: string;
   role?: string;
   address?: string;
   avatar?: string;
   blocked?: boolean;
   created_at?: Date; // Có thể chuyển thành kiểu Date 
   updated_at?: Date; // Có thể chuyển thành kiểu Date 
   wishlist?: string[]; // Mảng các chuỗi
}