import { UploadImageType } from "./commom";
import { User } from "./user";


type CategoryBlog = {
  _id: string;
  title: string;
  created_at: string,
  updated_at: string
}
export interface Blog {
  _id: string;
  title: string;
  description: string;
  category: CategoryBlog[];
  numViews: number;
  isLiked: boolean;
  isDisliked: boolean;
  likes: User[]; // Mảng các ID người dùng đã thích bài viết
  dislikes: User[]; // Mảng các ID người dùng đã không thích bài viết
  images: UploadImageType | string; // URL hình ảnh
  author: string;
  created_at: string; // Thời điểm tạo bài viết
  updated_at: string; // Thời điểm cập nhật bài viết
  views: number;
}