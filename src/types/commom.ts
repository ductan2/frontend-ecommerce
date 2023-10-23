
export interface MenuItemLink {
   href?: string;
   icon?: string;
   text?: string;
}

export type UploadImageType = {
   url: string
   asset_id: string
   public_id: string
}

export type AsyncState<T> = {
   data: T[];
   isError?: boolean;
   isLoading?: boolean;
   isSuccess?: boolean;
   message?: string
   dataUpdate?: T
};
export interface Province {
   name: string;
   code: number;
   division_type: string;
   codename: string;
   phone_code: number;
   districts: [];
 }