export interface Blog {
   _id: string;
   title: string;
   description: string;
   category: string;
   numViews: number;
   isLiked: boolean;
   isDisliked: boolean;
   likes: string[]; // Mảng các ID người dùng đã thích bài viết
   dislikes: string[]; // Mảng các ID người dùng đã không thích bài viết
   images: string; // URL hình ảnh
   author: string;
   created_at: string; // Thời điểm tạo bài viết
   updated_at: string; // Thời điểm cập nhật bài viết
   views: number;
 }